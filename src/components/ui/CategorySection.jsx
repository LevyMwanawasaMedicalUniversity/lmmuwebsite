"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CategorySection() {
  // We'll need to initialize any sliders/carousels on component mount
  useEffect(() => {
    // Initialize carousel if needed (using a library like Slick)
    // This would typically be done using useEffect and importing the library
    // For now, we'll assume the styling handles the appearance
  }, []);

  return (
    <section id="category-part">
      <div className="container">
        <div className="category pt-40 pb-80">
          <div className="row">
            <div className="col-lg-4">
              <div className="category-text pt-40">
                <h2>Learn More about our schools/Faculties</h2>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-8 offset-2">
              <div className="row category-slied mt-40">
                <div className="col-lg-4">
                  <Link href="/somcs">
                    <div className="singel-category text-center color-1">
                      <div className="icon">
                        <Image src="/assets/images/all-icon/ctg-1.jpeg" alt="School of Medicine and Clinical Sciences" width={64} height={64} />
                      </div>
                      <div className="cont">
                        <span>School of Medicine and Clinical Sciences</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-lg-4">
                  <Link href="/ibbs">
                    <div className="singel-category text-center color-2">
                      <div className="icon">
                        <Image src="/assets/images/all-icon/ctg-4.jpg" alt="Institute of Basic and Biomedical Sciences" width={64} height={64} />
                      </div>
                      <div className="cont">
                        <span>Institute of Basic and Biomedical Sciences</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-lg-4">
                  <Link href="/sophes">
                    <div className="singel-category text-center color-3">
                      <div className="icon">
                        <Image src="/assets/images/all-icon/ctg-3.jpg" alt="School of Public Health and Environmental Sciences" width={64} height={64} />
                      </div>
                      <div className="cont">
                        <span>School of Public Health and Environmental Sciences</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-lg-4">
                  <Link href="/soh">
                    <div className="singel-category text-center color-1">
                      <div className="icon">
                        <Image src="/assets/images/all-icon/ctg-2.JPG" alt="School of Health Sciences" width={64} height={64} />
                      </div>
                      <div className="cont">
                        <span>School of Health Sciences</span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-lg-4">
                  <Link href="/ns">
                    <div className="singel-category text-center color-2">
                      <div className="icon">
                        <Image src="/assets/images/all-icon/ctg-5.png" alt="School of Nursing" width={64} height={64} />
                      </div>
                      <div className="cont">
                        <span>School of Nursing</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}