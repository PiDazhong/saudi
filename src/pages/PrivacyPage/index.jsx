import { useTranslation } from '../../hooks/useTranslation';
import './index.less';

const PrivacyPage = () => {
  const { t } = useTranslation();

  const sections = [
    { key: 'collection', title: t('privacy.collection.title'), text: t('privacy.collection.text') },
    { key: 'usage', title: t('privacy.usage.title'), text: t('privacy.usage.text') },
    { key: 'sharing', title: t('privacy.sharing.title'), text: t('privacy.sharing.text') },
    { key: 'security', title: t('privacy.security.title'), text: t('privacy.security.text') },
    { key: 'rights', title: t('privacy.rights.title'), text: t('privacy.rights.text') },
  ];

  return (
    <div className="privacy-page">
      <div className="privacy-hero">
        <div className="container">
          <h1 className="privacy-title">{t('privacy.title')}</h1>
        </div>
      </div>
      <div className="container">
        <div className="privacy-content">
          <p className="privacy-intro">{t('privacy.intro')}</p>
          {sections.map((section) => (
            <section key={section.key} className="privacy-section">
              <h2 className="privacy-section-title">{section.title}</h2>
              <div className="privacy-section-text">{section.text}</div>
            </section>
          ))}
          <section className="privacy-section">
            <h2 className="privacy-section-title">{t('privacy.contact.title')}</h2>
            <div className="privacy-section-text">
              <p>{t('privacy.contact.text')}</p>
              <div className="privacy-contact-list">
                <div className="privacy-contact-item">
                  <span className="privacy-contact-label">{t('privacy.contact.emailLabel')}</span>
                  <span dir="ltr">{t('contact.email')}</span>
                </div>
                <div className="privacy-contact-item">
                  <span className="privacy-contact-label">{t('privacy.contact.phoneLabel')}</span>
                  <span dir="ltr">{t('contact.phone')}</span>
                </div>
                <div className="privacy-contact-item">
                  <span className="privacy-contact-label">{t('privacy.contact.addressLabel')}</span>
                  <span>{t('contact.address')}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
