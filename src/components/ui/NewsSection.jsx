"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function NewsSection() {
  return (
    <section id="news-part" className="pt-115 pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title pb-50">
              <h5>Latest News</h5>
              <h2>From the news</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="singel-news mt-30">
              <div className="news-thum pb-25">
                <Image 
                  src="/assets/images/news/n-1.jpeg" 
                  alt="2024 Trade Fair" 
                  width={540}
                  height={360}
                  className="img-fluid"
                />
              </div>
              <div className="news-cont">
                <ul>
                  <li><a href="#"><i className="fa fa-calendar"></i>June 2024 </a></li>
                  <li><a href="#"> <span>By</span> Admin</a></li>
                </ul>
                <Link href="/tradefair"><h3>2024 TRADE FAIR</h3></Link>
                <p>LMMU and LMMU-UTH Stand at the 2024 Trade Fair held in Ndola, Zambia at the Trade Fair Grounds.</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="singel-news news-list">
              <div className="row">
                <div className="col-sm-4">
                  <div className="news-thum mt-30">
                    <Image 
                      src="/assets/images/news/ns-1.jpg" 
                      alt="Graduation Ceremony"
                      width={200}
                      height={140}
                      className="img-fluid" 
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="news-cont mt-30">
                    <ul>
                      <li><a href="#"><i className="fa fa-calendar"></i>June 2024</a></li>
                      <li><a href="#"> <span>By</span> Admin</a></li>
                    </ul>
                    <Link href="/graduation"><h3>Graduation Ceremony</h3></Link>
                    <p>LMMU hosted its 4th Graduation Ceremony an event that celebrated the achievements of the Graduants and send forth trained and qualified professionals into the Work force.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="singel-news news-list">
              <div className="row">
                <div className="col-sm-4">
                  <div className="news-thum mt-30">
                    <Image 
                      src="/assets/images/news/ns-2.jpeg" 
                      alt="Induction Ceremony"
                      width={200}
                      height={140}
                      className="img-fluid" 
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="news-cont mt-30">
                    <ul>
                      <li><a href="#"><i className="fa fa-calendar"></i>May 2024</a></li>
                      <li><a href="#"> <span>By</span> Admin</a></li>
                    </ul>
                    <Link href="/induction"><h3>Induction Ceremony</h3></Link>
                    <p>LMMU hosted its first ever induction ceremony for The Bachelor of Medicine and The Bachelor of Surgery program in The School of Medicine and Clinical Sciences.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="singel-news news-list">
              <div className="row">
                <div className="col-sm-4">
                  <div className="news-thum mt-30">
                    <Image 
                      src="/assets/images/news/ns-3.jpeg" 
                      alt="International Labour Day"
                      width={200}
                      height={140}
                      className="img-fluid" 
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="news-cont mt-30">
                    <ul>
                      <li><a href="#"><i className="fa fa-calendar"></i>May 2024</a></li>
                      <li><a href="#"> <span>By</span> Admin</a></li>
                    </ul>
                    <Link href="/labour"><h3>International Labour Day</h3></Link>
                    <p>LMMU joined the rest of the world in comemorating the annual Labour Day and Marched.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}