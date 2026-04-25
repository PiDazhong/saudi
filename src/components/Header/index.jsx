import { MailOutlined, GlobalOutlined } from '@ant-design/icons';
import { useLang } from '../../context/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import SocialLinks from '../SocialLinks';
import './index.less';

const Header = () => {
  const { lang, setLang } = useLang();
  const { t } = useTranslation();

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
                <span>{t('header.contactUs')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
