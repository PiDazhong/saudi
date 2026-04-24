import React from 'react';
import './index.less';

const Part4Products = () => {
  const products = [
    { id: 1, name: 'Ergonomic Office Chair', category: 'Chairs' },
    { id: 2, name: 'Executive Desk', category: 'Desks' },
    { id: 3, name: 'Height Adjustable Desk', category: 'Desks' },
    { id: 4, name: 'Meeting Conference Table', category: 'Tables' },
    { id: 5, name: 'Workstation Pod', category: 'Workstations' },
    { id: 6, name: 'Reception Desk', category: 'Desks' },
  ];

  return (
    <section className="part4-products">
      <div className="products-container">
        <h2 className="products-title">Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-image-placeholder">
                <span className="product-category">{product.category}</span>
                <span className="product-name">{product.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Part4Products;
