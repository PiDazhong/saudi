import { useState } from 'react';
import { MailOutlined, GlobalOutlined } from '@ant-design/icons';
import SocialLinks from '../SocialLinks';
import './index.less';

const Header = () => {
  const [lang, setLang] = useState('en');

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <header className="site-header">
      {/* Top bar */}
      <div className="header-top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <SocialLinks />
            <div className="top-bar-right">
              <div className="lang-switch" onClick={toggleLang}>
                <GlobalOutlined />
                <span>{lang.toUpperCase()}</span>
              </div>
              <a href="#contact-form" className="top-bar-contact">
                <MailOutlined />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
