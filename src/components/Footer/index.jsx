import React from 'react';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { useTranslation } from '../../hooks/useTranslation';
import SocialLinks from '../SocialLinks';
import './index.less';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      {/* Main footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-block">
              <h5 className="footer-block-title">{t('aboutUs.title')}</h5>
              <div className="footer-block-content">
                <img src="/damons-white.png" alt="Damons" className="footer-logo-img" />
                <p className="footer-about-text">
                  {t('aboutUs.description')}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="footer-block">
              <h5 className="footer-block-title">{t('contact.title')}</h5>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <PhoneOutlined className="footer-contact-icon" />
                  <span>{t('contact.phone')}</span>
                </div>
                <div className="footer-contact-item">
                  <MailOutlined className="footer-contact-icon" />
                  <span>{t('contact.email')}</span>
                </div>
                <div className="footer-contact-item">
                  <EnvironmentOutlined className="footer-contact-icon" />
                  <span>{t('contact.address')}</span>
                </div>
              </div>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="container">
          <p>© 2026 DAMONS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
