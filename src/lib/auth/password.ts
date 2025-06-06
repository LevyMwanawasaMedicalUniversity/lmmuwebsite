import { hash, compare } from 'bcrypt';

/**
 * Hash a password with bcrypt
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

/**
 * Verify a password against a hash
 * @param {string} password - The plain text password to check
 * @param {string} hashedPassword - The hashed password to check against
 * @returns {Promise<boolean>} True if the password matches, false otherwise
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}
