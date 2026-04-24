import React, { useState } from 'react';
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
} from '@ant-design/icons';
import './index.less';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const topLinks = [
    { label: 'Showrooms', href: '#' },
    { label: 'Material & Colors', href: '#' },
    { label: 'Warranty', href: '#' },
  ];

  const mainMenu = [
    { label: 'Chairs', href: '#' },
    { label: 'Desks', href: '#', hasSubmenu: true },
    { label: 'Workstations', href: '#' },
    { label: 'Meeting Tables', href: '#' },
    { label: 'Accessories', href: '#' },
    { label: 'Contact', href: '#contact-form' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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

      {/* Main header */}
      <div className="header-main">
        <div className="container">
          <div className="header-main-inner">
            {/* Logo */}
            <a href="/" className="header-logo">
              <span className="logo-text">WORKSPACE</span>
            </a>

            {/* Desktop search */}
            <div className={`header-search ${searchOpen ? 'active' : ''}`}>
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search our catalog"
                  className="search-input"
                />
                <button className="search-btn" aria-label="Search">
                  <SearchOutlined />
                </button>
              </div>
            </div>

            {/* Right actions */}
            <div className="header-actions">
              <button
                className="action-btn search-toggle"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Toggle search"
              >
                <SearchOutlined />
                <span className="action-label">Search</span>
              </button>
              <a href="#" className="action-btn">
                <UserOutlined />
                <span className="action-label">Sign in</span>
              </a>
              <a href="#" className="action-btn">
                <ShoppingCartOutlined />
                <span className="action-label">Cart</span>
              </a>
              <button
                className="action-btn mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation menu */}
      <nav className="header-nav-menu">
        <div className="container">
          <ul className="nav-menu-list">
            {mainMenu.map((item) => (
              <li key={item.label} className="nav-menu-item">
                <a href={item.href} className="nav-menu-link">
                  {item.label}
                  {item.hasSubmenu && <DownOutlined className="submenu-icon" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search our catalog"
              className="search-input"
            />
            <button className="search-btn" aria-label="Search">
              <SearchOutlined />
            </button>
          </div>
        </div>
        <ul className="mobile-menu-list">
          {mainMenu.map((item) => (
            <li key={item.label} className="mobile-menu-item">
              <a href={item.href} className="mobile-menu-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
