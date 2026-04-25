import React, { useState, useEffect, useCallback } from 'react';
import { Carousel } from 'antd';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/uploadModules';
import './index.less';

const Part6Factory = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.list()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/icons/factory' }),
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
    return `${API_BASE_URL}/icons/factory/${filename}`;
  };

  return (
    <section className="part6-factory">
      <div className="factory-container">
        <div className="factory-section">
          <div className="factory-text">
            <h2 className="factory-title">
              Innovative and Exclusive Materials and Finishes
            </h2>
            <p className="factory-desc">
              Workspace creates a modern workplace with award-winning ST19 boards
              and innovative office furniture combining trendy materials and sleek
              design.
            </p>
            <a href="#" className="factory-link">
              Learn More
            </a>
          </div>
          <div className="factory-image-wrapper">
            {images.length > 0 ? (
              <Carousel autoplay>
                {images.map((item, index) => {
                  const url = typeof item === 'string'
                    ? getFileUrl(item)
                    : item.url || getFileUrl(item.filename || item.name);
                  return (
                    <div key={index} className="carousel-slide">
                      <img src={url} alt={`factory-${index}`} className="factory-image" />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div className="factory-image" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Part6Factory;
