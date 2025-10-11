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

  return (
    <>
      <nav className={`luxury-navbar${isScrolled ? ' luxury-navbar--scrolled' : ''}`}>
        <div className="luxury-navbar__background"></div>

        <div className="luxury-navbar__content">
          <div className="luxury-navbar__wrapper">

            <div className="brand-section">
              <div className="brand-section__title">Vafa Acres</div>
            </div>

            <button
              className="menu-button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        <div className="luxury-navbar__border"></div>
      </nav>

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
              <a href="/" className="menu-link" onClick={() => setIsOpen(false)}>Home</a>
              <a href="/about" className="menu-link" onClick={() => setIsOpen(false)}>About Us</a>
              <a href="/farmhouse" className="menu-link" onClick={() => setIsOpen(false)}>The Farmhouse</a>
              <a href="/gallery" className="menu-link" onClick={() => setIsOpen(false)}>Gallery</a>
               <a href="/contact" className="menu-link" onClick={() => setIsOpen(false)}>Contact Us</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
