import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/uploadModules';
import './index.less';

const Part4Products = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.list()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/icons/products' }),
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
    return `${API_BASE_URL}/icons/products/${filename}`;
  };

  const products = [
    { id: 1, name: 'Zenon Black L-Shape Executive' },
    { id: 2, name: 'Modena White Ergonomic' },
    { id: 3, name: 'AVA Series Cluster of 4 Face' },
    { id: 4, name: 'Max Series Dual Motor Electric' },
    { id: 5, name: 'Ace Series Cluster of 4 Face' },
  ];

  return (
    <section className="part4-products">
      <div className="products-container">
        <h2 className="products-title">Featured Products</h2>
        <div className="products-grid">
          {products.map((product, index) => {
            const imageItem = images[index];
            const imageUrl = imageItem
              ? (typeof imageItem === 'string' ? getFileUrl(imageItem) : imageItem.url || getFileUrl(imageItem.filename || imageItem.name))
              : null;
            if (!imageUrl) return null;
            const imageName = imageItem
              ? (typeof imageItem === 'string' ? imageItem : imageItem.name || imageItem.filename || '')
              : '';
            const displayName = imageName
              ? imageName.replace(/\.[^/.]+$/, '')
              : product.name;
            return (
              <div key={product.id} className="product-item">
                <div className="product-card">
                  <div className="product-image-wrapper">
                    <img src={imageUrl} alt={displayName} className="product-image" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{displayName}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Part4Products;
