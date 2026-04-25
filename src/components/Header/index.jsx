import './index.less';

const Header = () => {
  const topLinks = [
    { label: 'Showrooms', href: '#' },
    { label: 'Material & Colors', href: '#' },
    { label: 'Warranty', href: '#' },
  ];

  return (
    <header className="site-header">
      {/* Top bar */}
      <div className="header-top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <nav className="top-nav">
              {topLinks.map((link) => (
                <a key={link.label} href={link.href} className="top-nav-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
