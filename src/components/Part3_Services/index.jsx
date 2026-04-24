import React from 'react';
import { Card } from 'antd';
import { BulbOutlined, RocketOutlined, BuildOutlined } from '@ant-design/icons';
import './index.less';

const Part3Services = () => {
  const services = [
    {
      id: 1,
      icon: <BulbOutlined className="service-icon" />,
      title: 'Free Design Consultation',
      description:
        'Our professional design team provides free consultation and 3D visualization. We tailor every solution to your workspace needs and brand identity.',
    },
    {
      id: 2,
      icon: <RocketOutlined className="service-icon" />,
      title: 'Fast Delivery & Installation',
      description:
        'Efficient production and supply chain management ensure your order is delivered and installed on time. We serve UAE, GCC, and worldwide.',
    },
    {
      id: 3,
      icon: <BuildOutlined className="service-icon" />,
      title: 'Custom Manufacturing',
      description:
        'With our own local factory, we support full customization from design to production. Quality controlled, communication seamless.',
    },
  ];

  return (
    <section className="part3-services">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <Card key={service.id} className="service-card" bordered={false}>
              <div className="service-content">
                <div className="service-icon-wrapper">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Part3Services;
