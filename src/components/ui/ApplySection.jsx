"use client";

import Link from 'next/link';

export default function ApplySection() {
  return (
    <section id="apply-aprt" className="pb-120">
      <div className="container">
        <div className="apply">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <div className="apply-cont apply-color-1">
                <h3>STUDY AT LMMU</h3>
                <p>Join the LMMU community of students, departments, staff who all share one commitment through our motto "Let no one be left behind"</p>
                
                <Link href="/assets/files/LMMU 2025 ADVERT.pdf" className="main-btn" target="_blank">
                  HOW TO APPLY
                </Link><br/><br/>
                
                <Link href="/assets/files/LMMU 2025 APPLICATION FORM  FINAL.pdf" className="main-btn" target="_blank">
                  APPLICATION FORM
                </Link><br/><br/>
                
                <Link href="/schools" className="main-btn">
                  TUITION FEES STRUCTURE
                </Link><br/><br/>
                
                <a href="https://edurole.lmmu.ac.zm" className="main-btn" target="_blank" rel="noopener noreferrer">
                  APPLY ONLINE
                </a>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="apply-cont apply-color-2">
                <h3>Application Requirements</h3>
                <p>To learn more about the application requirements and application procedure click the video below.</p>
                <div className="video-container">
                  <iframe 
                    width="460" 
                    height="301" 
                    src="https://www.youtube.com/embed/nKO3NFUzvZ8?si=wea4mQBNJz0s8yQY" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}