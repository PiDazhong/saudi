import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './index.less';

const Part1Hero = () => {
  const handleScrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="part1-hero">
      <div className="hero-background">
        <div className="bg-image-placeholder">
          <div className="bg-overlay" />
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Modern Office Furniture Solutions
          </h1>
          <p className="hero-subtitle">
            Leading manufacturer of ergonomic office chairs, modern desks,
            and complete workstation solutions. Transform your workplace with
            our premium furniture collection.
          </p>
          <Button
            type="primary"
            size="large"
            className="hero-button"
            onClick={handleScrollToForm}
          >
            Get Instant Quote
            <ArrowRightOutlined />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Part1Hero;
