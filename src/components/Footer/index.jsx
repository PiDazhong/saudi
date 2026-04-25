import React from 'react';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import './index.less';

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Main footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-block">
              <h5 className="footer-block-title">About us</h5>
              <div className="footer-block-content">
                <img src="/damons-white.png" alt="Damons" className="footer-logo-img" />
                <p className="footer-about-text">
                  WORKSPACE is a leading, Dubai-based manufacturer, designer and supplier
                  of modern office furniture. Committed to provide workplace furniture that
                  delivers great value by combining modern design, dependable quality and
                  exceptional service.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="footer-block">
              <h5 className="footer-block-title">Contact</h5>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <PhoneOutlined className="footer-contact-icon" />
                  <span>+971 4 123 4567</span>
                </div>
                <div className="footer-contact-item">
                  <MailOutlined className="footer-contact-icon" />
                  <span>info@workspace.ae</span>
                </div>
                <div className="footer-contact-item">
                  <EnvironmentOutlined className="footer-contact-icon" />
                  <span>Dubai, United Arab Emirates</span>
                </div>
              </div>
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
