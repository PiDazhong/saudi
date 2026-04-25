import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/uploadModules';
import './index.less';

const Part3Services = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.list()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/icons/services' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || data.code !== 1) {
        throw new Error(data.message || '获取图片列表失败');
      }
      const listData = data.data ?? [];
      setImages(Array.isArray(listData) ? listData : []);
    } catch (err) {
      console.error('获取图片失败:', err.message);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const getFileUrl = (filename) => {
    return `${API_BASE_URL}/icons/services/${filename}`;
  };

  const services = [
    {
      id: 1,
      icon: images[0]
        ? (typeof images[0] === 'string' ? getFileUrl(images[0]) : images[0].url || getFileUrl(images[0].filename || images[0].name))
        : 'https://workspace.ae/img/cms/Home/Project-icon-.png',
      title: 'Project Based Quoting',
      description:
        'Free Initial Budget Estimate to fully furnish your work space and estimate the total project cost, as well as evaluate saving opportunities.',
    },
    {
      id: 2,
      icon: images[1]
        ? (typeof images[1] === 'string' ? getFileUrl(images[1]) : images[1].url || getFileUrl(images[1].filename || images[1].name))
        : 'https://workspace.ae/img/cms/Home/Space-icon-.png',
      title: 'Space Management and Consultancy',
      description:
        'Ask for consultation for space management, project management, personalized planning, assessment budget development, purchasing and installation.',
    },
    {
      id: 3,
      icon: images[2]
        ? (typeof images[2] === 'string' ? getFileUrl(images[2]) : images[2].url || getFileUrl(images[2].filename || images[2].name))
        : 'https://workspace.ae/img/cms/Home/Color-icon-.png',
      title: 'Choose Color, Finishes & Sizes',
      description:
        'Providing hundreds of options to customize the size, color and finish of your office furniture to meet the requirements of every company and individual.',
    },
  ];

  return (
    <section className="part3-services">
      <div className="services-container">
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-icon-wrapper">
                <img src={service.icon} alt={service.title} className="service-icon" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Part3Services;
