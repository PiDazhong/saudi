import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import './index.less';

const STORAGE_KEY = 'saudi_damons_cookie_consent';

const CookieBanner = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <p className="cookie-banner-text">
          {t('cookie.banner.text')}{' '}
          <Link to="/privacy" className="cookie-banner-link">
            {t('cookie.banner.privacy')}
          </Link>
        </p>
        <button className="cookie-banner-btn" onClick={handleAccept}>
          {t('cookie.banner.accept')}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
