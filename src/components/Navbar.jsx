// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.scss';

// IMPORTANT: this path is from src/components → src/assets
// Make sure a file exists at: src/assets/menu-bg.jpg
// (You can rename your own file to menu-bg.jpg or change the filename below)
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
        <div className="luxury-navbar__background"></div>

        <div className="luxury-navbar__content">
          <div className="luxury-navbar__wrapper">

            {/* Brand Section - Left */}
            <div className="brand-section">
              <div className="brand-section__title">FOUR LINKS</div>
            </div>

            {/* Desktop Nav Links - Center */}
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href} className="nav-links__item">
                  <a href={link.href} className="nav-links__link">
                    {link.label}
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
                {isOpen ? <X size={32} /> : <Menu size={32} />}
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
            backgroundImage: `linear-gradient(rgba(10,10,10,0.7), rgba(10,10,10,0.9)), url(${menuBg})`,
          }}
        >
          <div className="overlay-menu__header">
            <div className="luxury-navbar__background"></div>
            <div className="luxury-navbar__content">
              <div className="luxury-navbar__wrapper">
                <div className="brand-section brand-section--mobile">
                  <div className="brand-section__title">Vafa Acres</div>
                </div>
              </div>
            </div>
          </div>

          <div className="overlay-menu__items">
            <div className="overlay-menu__list">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="menu-link" 
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