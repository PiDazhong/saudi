import React from 'react';
import {
  TwitterOutlined,
  InstagramOutlined,
  SendOutlined,
} from '@ant-design/icons';
import './index.less';

const Footer = () => {
  const quickLinks = [
    { label: 'Workspace Design Studio', href: '#' },
    { label: 'Delivery & Installation', href: '#' },
    { label: 'Material & Colors', href: '#' },
    { label: 'Warranty & Return Policy', href: '#' },
    { label: 'Showrooms', href: '#' },
  ];

  const categories = [
    { label: 'Chairs', href: '#' },
    { label: 'Desks', href: '#' },
    { label: 'Workstations', href: '#' },
    { label: 'Meeting Tables', href: '#' },
    { label: 'Accessories', href: '#' },
  ];

  return (
    <footer className="site-footer">
      {/* Newsletter bar */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-inner">
            <div className="newsletter-text">
              <h4>Sign up to newsletter</h4>
              <p>Get the latest updates on new products and promotions.</p>
            </div>
            <form className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <SendOutlined />
                </button>
              </div>
            </form>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <TwitterOutlined />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <InstagramOutlined />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-block">
              <h5 className="footer-block-title">About us</h5>
              <div className="footer-block-content">
                <p className="footer-logo">WORKSPACE</p>
                <p className="footer-about-text">
                  WORKSPACE is a leading, Dubai-based manufacturer, designer and supplier
                  of modern office furniture. Committed to provide workplace furniture that
                  delivers great value by combining modern design, dependable quality and
                  exceptional service.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-block">
              <h5 className="footer-block-title">Quick Links</h5>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-block">
              <h5 className="footer-block-title">Categories</h5>
              <ul className="footer-links">
                {categories.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="container">
          <p>© 2025 WORKSPACE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
