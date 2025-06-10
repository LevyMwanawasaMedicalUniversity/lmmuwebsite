import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir, unlink, access } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { constants } from 'fs';

export async function POST(req: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions);
    
    console.log('Upload request from user:', session?.user);
    
    if (!session || !session.user || session.user.role !== 'admin') {
      console.log('Unauthorized upload attempt');
      return NextResponse.json(
        { error: 'Unauthorized - You must be an admin to upload files' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const oldImagePath = formData.get('oldImagePath') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // If there's an old image and it's in the uploads directory, try to delete it
    if (oldImagePath && oldImagePath.startsWith('/uploads/')) {
      try {
        // Get just the filename part from the path
        const oldFileName = oldImagePath.split('/').pop();
        if (oldFileName) {
          const oldFilePath = path.join(process.cwd(), 'public', 'uploads', oldFileName);
          // Check if file exists before trying to delete it
          try {
            await access(oldFilePath, constants.F_OK);
            await unlink(oldFilePath);
            console.log(`Deleted old image: ${oldFilePath}`);
          } catch (accessErr) {
            console.log(`Old file doesn't exist or can't be accessed: ${oldFilePath}`);
          }
        }
      } catch (err) {
        console.error('Error deleting old image:', err);
        // Continue with the upload even if deletion fails
      }
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed. Please upload an image file (JPEG, PNG, GIF, WEBP).' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit.' },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      // Directory already exists or other error
      console.log('Directory creation error (may already exist):', err);
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Write file to disk
    const filePath = path.join(uploadsDir, fileName);
    try {
      await writeFile(filePath, buffer);
      console.log(`File successfully written to ${filePath}`);
    } catch (writeError) {
      console.error('Error writing file:', writeError);
      return NextResponse.json(
        { error: `Error writing file: ${writeError.message}` },
        { status: 500 }
      );
    }
    
    // Return the URL to the uploaded file
    const fileUrl = `/uploads/${fileName}`;
    console.log('File uploaded successfully:', fileUrl);
    
    return NextResponse.json({ 
      success: true,
      url: fileUrl
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
