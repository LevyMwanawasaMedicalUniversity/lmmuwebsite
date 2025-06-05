"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUniversitySubmenu, setShowUniversitySubmenu] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close submenu when main menu is closed
    if (!isMenuOpen === false) {
      setShowUniversitySubmenu(false);
    }
  };
  
  const toggleUniversitySubmenu = () => {
    setShowUniversitySubmenu(!showUniversitySubmenu);
  };

  // Add CSS styles for navigation hover effects and dropdowns
  const navStyles = `
    .nav-link.custom-nav-link {
      color: #212529;
      transition: color 0.3s ease;
      padding: 0.75rem 1rem;
    }
    .nav-link.custom-nav-link:hover {
      color: #ffc600 !important;
    }
    .nav-link.custom-nav-link.active {
      color: #ffc600 !important;
      font-weight: bold;
    }
    .search-icon:hover {
      color: #ffc600 !important;
    }
    .dropdown-menu {
      border-radius: 0;
      margin-top: 0;
      border-top: 3px solid #ffc600;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    .dropdown-item {
      padding: 0.5rem 1.5rem;
      transition: all 0.3s ease;
    }
    .dropdown-item:hover {
      background-color: #f8f9fa;
      color: #07294d;
      padding-left: 1.75rem;
    }
    .dropdown-item.active {
      background-color: #07294d;
      color: #fff;
    }
    .dropdown-header {
      color: #07294d;
      font-weight: bold;
      border-bottom: 1px solid #eee;
    }
    .dropdown-toggle::after {
      margin-left: 0.5rem;
      vertical-align: middle;
    }
    .nav-item.dropdown:hover .dropdown-menu {
      display: block;
    }
    .mobile-submenu {
      padding-left: 1.5rem;
      border-left: 2px solid #ffc600;
      margin: 0.5rem 0 0.5rem 1rem;
      animation: fadeIn 0.3s ease-in-out;
    }
    .mobile-submenu .dropdown-item {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style jsx>{navStyles}</style>
      {/* Top info bar */}
      <div className="top-info-bar bg-dark py-2 d-none d-lg-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="d-flex text-white small">
                <div className="me-4">
                  <i className="fa fa-map-marker-alt me-2"></i>
                  <span>Plot L/Lusaka/3170151 P.O. Box 33991</span>
                </div>
                <div className="me-4">
                  <i className="fa fa-envelope me-2"></i>
                  <span>info@lmmu.ac.zm</span>
                </div>
              </div>
            </div>
            <div className="col-lg-5 text-end">
              <div className="text-white small">
                <i className="fa fa-clock me-2"></i>
                <span>Opening Hours: Monday to Saturday - 8 Am to 5 Pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header with logo and contact */}
      <header className="header-main py-3 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4">
              <div className="logo">
                <Link href="/" className="d-block">
                  <Image src="/assets/images/logo.png" alt="LMMU Logo" height={70} width={100} className="img-fluid" />
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-8 d-none d-md-block">
              <div className="d-flex justify-content-end align-items-center">
                <div className="contact-info d-flex align-items-center">
                  <div className="icon text-primary me-3">
                    <i className="fa fa-phone-alt fa-2x"></i>
                  </div>
                  <div>
                    <p className="text-muted mb-0 small">Need Help? call us free</p>
                    <span className="fw-bold">+260974330519/+260953821693</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main horizontal navigation */}
      <div className="main-navigation bg-white border-bottom shadow-sm" style={{ display: 'block', width: '100%' }}>
        <div className="container">
          {/* Regular desktop menu */}
          <div className="d-none d-lg-flex" style={{ height: '50px', alignItems: 'center' }}>
            <ul className="nav">
              <li className="nav-item">
                <Link 
                  className={`nav-link custom-nav-link ${pathname === '/' ? 'active' : ''}`}
                  href="/"
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item dropdown mx-3">
                <Link 
                  className={`nav-link custom-nav-link dropdown-toggle ${pathname?.includes('/university') ? 'active' : ''}`}
                  href="/university"
                  role="button"
                  aria-expanded="false"
                >
                  THE UNIVERSITY
                </Link>
                <ul className="dropdown-menu">
                  <li><h6 className="dropdown-header">UNIVERSITY GOVERNANCE</h6></li>
                  <li><Link className="dropdown-item" href="/university/mission-vision">Mission, Vision and Motto</Link></li>
                  <li><Link className="dropdown-item" href="/university/background">University Background</Link></li>
                  <li><Link className="dropdown-item" href="/university/council">University Council</Link></li>
                  <li><Link className="dropdown-item" href="/university/senate">University Senate</Link></li>
                  <li><Link className="dropdown-item" href="/university/officers">Principal Officers</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  
                  <li><h6 className="dropdown-header">SCHOOLS / FACULTIES</h6></li>
                  <li><Link className="dropdown-item" href="/academics/schools/ibbs">Institute of Basic and Biomedical Sciences</Link></li>
                  <li><Link className="dropdown-item" href="/academics/schools/son">School of Nursing</Link></li>
                  <li><Link className="dropdown-item" href="/academics/schools/soh">School of Health Sciences</Link></li>
                  <li><Link className="dropdown-item" href="/academics/schools/somcs">School of Medicine and Clinical Sciences</Link></li>
                  <li><Link className="dropdown-item" href="/academics/schools/sophes">School of Public Health and Environmental Sciences</Link></li>
                  <li><Link className="dropdown-item" href="/academics/schools/drpgs">Directorate of Research and Graduate Studies</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  
                  <li><h6 className="dropdown-header">INSTITUTIONAL BUREAUS</h6></li>
                  <li><Link className="dropdown-item" href="/facilities/uth">Levy Mwanawasa University Teaching Hospital</Link></li>
                  <li><Link className="dropdown-item" href="/facilities/training-hubs">Regional Training Hubs</Link></li>
                  <li><Link className="dropdown-item" href="/facilities/teaching-areas">Teaching and Learning Areas</Link></li>
                  <li><Link className="dropdown-item" href="/facilities/library">The Zambia National Health Reference Library</Link></li>
                </ul>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className={`nav-link custom-nav-link ${pathname?.includes('/academics') ? 'active' : ''}`}
                  href="/academics"
                >
                  ACADEMICS
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className={`nav-link custom-nav-link ${pathname?.includes('/portals') ? 'active' : ''}`}
                  href="/portals"
                >
                  PORTALS
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className={`nav-link custom-nav-link ${pathname?.includes('/careers') ? 'active' : ''}`}
                  href="/careers"
                >
                  CAREERS
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link 
                  className={`nav-link custom-nav-link ${pathname?.includes('/contact') ? 'active' : ''}`}
                  href="/contact"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
            <div className="ms-auto">
              {/* <button className="btn btn-link" onClick={toggleSearch} style={{ border: 'none', padding: '0.75rem 1rem' }}>
                <i className="fa fa-search search-icon"></i>
              </button> */}
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className="d-lg-none">
            <button 
              className="navbar-toggler text-dark my-2 border-0" 
              type="button" 
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <i className="fa fa-bars"></i> MENU
            </button>
            
            {isMenuOpen && (
              <div className="mobile-menu py-2">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className={`nav-link custom-nav-link ${pathname === '/' ? 'active' : ''}`} href="/">HOME</Link>
                  </li>
                  <li className="nav-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link className={`nav-link custom-nav-link ${pathname?.includes('/university') ? 'active' : ''}`} href="/university">THE UNIVERSITY</Link>
                      <button 
                        className="btn btn-sm" 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleUniversitySubmenu();
                        }}
                      >
                        <i className={`fas ${showUniversitySubmenu ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                      </button>
                    </div>
                    {showUniversitySubmenu && (
                      <div className="mobile-submenu">
                        <div className="mb-2 mt-1">
                          <small className="text-muted fw-bold">UNIVERSITY GOVERNANCE</small>
                        </div>
                        <Link className="dropdown-item" href="/university/mission-vision">Mission, Vision and Motto</Link>
                        <Link className="dropdown-item" href="/university/background">University Background</Link>
                        <Link className="dropdown-item" href="/university/council">University Council</Link>
                        <Link className="dropdown-item" href="/university/senate">University Senate</Link>
                        <Link className="dropdown-item" href="/university/officers">Principal Officers</Link>
                        
                        <div className="mb-2 mt-3">
                          <small className="text-muted fw-bold">SCHOOLS / FACULTIES</small>
                        </div>
                        <Link className="dropdown-item" href="/schools/ibbs">Institute of Basic and Biomedical Sciences</Link>
                        <Link className="dropdown-item" href="/schools/nursing">School of Nursing</Link>
                        <Link className="dropdown-item" href="/schools/health-sciences">School of Health Sciences</Link>
                        <Link className="dropdown-item" href="/schools/medicine">School of Medicine and Clinical Sciences</Link>
                        <Link className="dropdown-item" href="/schools/public-health">School of Public Health and Environmental Sciences</Link>
                        <Link className="dropdown-item" href="/schools/graduate-studies">Directorate of Research and Graduate Studies</Link>
                        
                        <div className="mb-2 mt-3">
                          <small className="text-muted fw-bold">INSTITUTIONAL BUREAUS</small>
                        </div>
                        <Link className="dropdown-item" href="/facilities/uth">Levy Mwanawasa University Teaching Hospital</Link>
                        <Link className="dropdown-item" href="/facilities/training-hubs">Regional Training Hubs</Link>
                        <Link className="dropdown-item" href="/facilities/teaching-areas">Teaching and Learning Areas</Link>
                        <Link className="dropdown-item" href="/facilities/library">The Zambia National Health Reference Library</Link>
                      </div>
                    )}
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link custom-nav-link ${pathname?.includes('/academics') ? 'active' : ''}`} href="/academics">ACADEMICS</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link custom-nav-link ${pathname?.includes('/portals') ? 'active' : ''}`} href="/portals">PORTALS</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link custom-nav-link ${pathname?.includes('/careers') ? 'active' : ''}`} href="/careers">CAREERS</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link custom-nav-link ${pathname?.includes('/contact') ? 'active' : ''}`} href="/contact">CONTACT</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

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