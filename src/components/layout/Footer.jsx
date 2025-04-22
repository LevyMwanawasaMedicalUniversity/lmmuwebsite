"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer-part">
      <div className="footer-top pt-40 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-about mt-40">
                <div className="logo">
                  <Link href="/">
                    <Image src="/assets/images/logo-2.png" alt="Logo" height={60} width={90} priority />
                  </Link>
                </div>
                <p>To educate and train health professionals using hands-on and competence-based training that is administered through a distributed network of academic health complexes in order to contribute towards Universal Health Coverage in Zambia.</p>
                <ul className="mt-20">
                  <li><a href="https://www.facebook.com/LevyMwanawasaMedicalUniversity" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook-f"></i></a></li>
                  <li><a href="https://www.linkedin.com/company/levy-mwanawasa-medical-univerisity" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a></li>
                  <li><a href="https://youtube.com/@lmmuict?si=32-5IdcWMFGgmcFt" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a></li>
                  <li><a href="https://www.instagram.com/levymwanawasamedicauniversity/" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-link mt-40">
                <div className="footer-title pb-25">
                  <h6>Sitemap</h6>
                </div>
                <ul>
                  <li><Link href="/"><i className="fa fa-angle-right"></i>Home</Link></li>
                  <li><Link href="/university"><i className="fa fa-angle-right"></i>The University</Link></li>
                  <li><Link href="/academics"><i className="fa fa-angle-right"></i>Academics</Link></li>
                  <li><Link href="/portals"><i className="fa fa-angle-right"></i>Portals</Link></li>
                  <li><Link href="/contact"><i className="fa fa-angle-right"></i>Contact</Link></li>
                </ul>
                <ul>
                  <li><Link href="/background"><i className="fa fa-angle-right"></i>Background</Link></li>
                  <li><Link href="/uth"><i className="fa fa-angle-right"></i>LMMU-UTH</Link></li>
                  <li><Link href="/officers"><i className="fa fa-angle-right"></i>management</Link></li>
                  <li><Link href="/schools"><i className="fa fa-angle-right"></i>Schools</Link></li>
                  <li><Link href="/graduation"><i className="fa fa-angle-right"></i>Gallery</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-address mt-40">
                <div className="footer-title pb-25">
                  <h6>Contact Us</h6>
                </div>
                <ul>
                  <li>
                    <div className="icon">
                      <i className="fa fa-home"></i>
                    </div>
                    <div className="cont">
                      <p>Plot L/Lusaka/3170151, P.O. Box 33991</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fa fa-phone"></i>
                    </div>
                    <div className="cont">
                      <p>+260974330519 / +260953821693</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fa fa-envelope-o"></i>
                    </div>
                    <div className="cont">
                      <p>info@lmmu.ac.zm</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#" className="back-to-top"><i className="fa fa-angle-up"></i></a>
    </footer>
  );
}