import React from 'react';
import { ArrowUp, Facebook, Instagram, Linkedin } from 'lucide-react';
import './Footer.scss';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const siteMapLinks = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Contact', href: '#' },
];


  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Services', href: '#' },
    { label: "Lawyer's Corners", href: '#' }
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' }
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__brand">
            <div className="footer__logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 10L16 16L28 10L16 4Z" fill="#F59E0B"/>
                <path d="M4 22L16 28L28 22L16 16L4 22Z" fill="#F59E0B"/>
              </svg>
              <span className="footer__logo-text">FOURLINKS</span>
            </div>
            <p className="footer__description">
             Four Links Group — A UAE-based construction and technical services company, proudly shaping the nation’s growth through quality and iconic projects.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <button className="footer__back-to-top" onClick={scrollToTop}>
              <ArrowUp size={16} />
              BACK TO TOP
            </button>
          </div>

          {/* Site Map */}
          <div className="footer__links">
            <h3 className="footer__links-title">Site Map</h3>
            <ul className="footer__links-list">
              {siteMapLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="footer__links">
            <h3 className="footer__links-title">Legal</h3>
            <ul className="footer__links-list">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer__copyright">
        <p>Copyright © 2025, FOURLINKS, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;