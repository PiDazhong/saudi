import React, { useState, useEffect, useCallback } from 'react';
import { Carousel } from 'antd';
import { useTranslation } from '../../hooks/useTranslation';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/uploadModules';
import './index.less';

const Part8Cases = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.list()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/icons/eg' }),
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
    return `${API_BASE_URL}/icons/eg/${filename}`;
  };

  return (
    <section className="part8-cases">
      <div className="cases-container">
        <div className="cases-section">
          <div className="cases-image-wrapper">
            {images.length > 0 ? (
              <Carousel autoplay>
                {images.map((item, index) => {
                  const url = typeof item === 'string'
                    ? getFileUrl(item)
                    : item.url || getFileUrl(item.filename || item.name);
                  return (
                    <div key={index} className="carousel-slide">
                      <img src={url} alt={`cases-${index}`} className="cases-image" />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div className="cases-image" />
            )}
          </div>
          <div className="cases-text">
            <h2 className="cases-title">
              {t('cases.title')}
            </h2>
            <p className="cases-desc">
              {t('cases.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Part8Cases;
