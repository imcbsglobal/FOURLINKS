// ===================================================================
// src/components/Navbar.jsx
// ===================================================================
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.scss';

// Import your logo
import logo from '../assets/LOGOFOURLINKS.png';
import menuBg from '../assets/gallery1.jpg';

export default function LuxuryNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/farmhouse', label: 'Service' },
    { href: '/gallery', label: 'Project' },
    { href: '/contact', label: 'Contact Us' }
  ];

  return (
    <>
      <nav className={`luxury-navbar${isScrolled ? ' luxury-navbar--scrolled' : ''}`}>
        <div className="luxury-navbar__content">
          <div className="luxury-navbar__wrapper">

            {/* Brand Section - Left with Logo */}
            <div className="brand-section">
              <a href="/" className="brand-section__logo-link">
                <div className="brand-section__logo-container">
                  <img 
                    src={logo} 
                    alt="Four Links Logo" 
                    className="brand-section__logo"
                  />
                </div>
              </a>
            </div>

            {/* Desktop Nav Links - Center */}
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href} className="nav-links__item">
                  <a href={link.href} className="nav-links__link">
                    <span className="nav-links__link-text">{link.label}</span>
                    <span className="nav-links__link-underline"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Actions - Mobile Menu Button */}
            <div className="right-actions">
              <button
                className="menu-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        <div className="luxury-navbar__border"></div>
      </nav>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div
          className="overlay-menu"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.95)), url(${menuBg})`,
          }}
        >
          <div className="overlay-menu__header">
            <div className="brand-section brand-section--mobile">
              <a href="/" className="brand-section__logo-link">
                <div className="brand-section__logo-container">
                  <img 
                    src={logo} 
                    alt="Four Links Logo" 
                    className="brand-section__logo"
                  />
                </div>
              </a>
            </div>
          </div>

          <div className="overlay-menu__items">
            <div className="overlay-menu__list">
              {navLinks.map((link, index) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="menu-link"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}