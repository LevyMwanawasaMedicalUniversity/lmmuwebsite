"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header id="header-part">
        <div className="header-top d-none d-lg-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="header-contact text-lg-left text-center">
                  <ul>
                    <li><Image src="/assets/images/all-icon/map.png" alt="icon" width={16} height={16} /><span>Plot L/Lusaka/3170151 P.O. Box 33991</span></li>
                    <li><Image src="/assets/images/all-icon/email.png" alt="icon" width={16} height={16} /><span>info@lmmu.ac.zm</span></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="header-opening-time text-lg-right text-center">
                  <p>Opening Hours : Monday to Saturday - 8 Am to 5 Pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-logo-support pt-30 pb-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="logo">
                  <Link href="/">
                    <Image src="/assets/images/logo.png" alt="Logo" height={60} width={90} />
                  </Link>
                </div>
              </div>
              <div className="col-lg-8 col-md-8">
                <div className="support-button float-right d-none d-md-block">
                  <div className="support float-left">
                    <div className="icon">
                      <Image src="/assets/images/all-icon/support.png" alt="icon" width={40} height={40} />
                    </div>
                    <div className="cont">
                      <p>Need Help? call us free</p>
                      <span>+260974330519/+260953821693</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navigation">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-md-10 col-sm-9 col-8">
                <nav className="navbar navbar-expand-lg">
                  <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleMenu}
                    aria-controls="navbarSupportedContent" 
                    aria-expanded={isMenuOpen ? "true" : "false"} 
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>

                  <div className={`collapse navbar-collapse sub-menu-bar ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="active" href="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/university">The University</Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/academics">Academics</Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/portals">Portals</Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/careers">Careers</Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                <div className="right-icon text-right">
                  <ul>
                    <li><a href="#" id="search" onClick={toggleSearch}><i className="fa fa-search"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showSearch && (
        <div className="search-box">
          <div className="serach-form">
            <div className="closebtn" onClick={toggleSearch}>
              <span></span>
              <span></span>
            </div>
            <form action="#">
              <input type="text" placeholder="Search by keyword" />
              <button><i className="fa fa-search"></i></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}