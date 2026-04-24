import React from 'react';
import './index.less';

const Part2Trust = () => {
  const clientLogos = [
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
    { id: 3, name: 'Client C' },
    { id: 4, name: 'Client D' },
    { id: 5, name: 'Client E' },
    { id: 6, name: 'Client F' },
    { id: 7, name: 'Client G' },
    { id: 8, name: 'Client H' },
  ];

  const certificates = [
    { id: 1, name: 'ISO 9001' },
    { id: 2, name: 'Quality Certified' },
    { id: 3, name: 'Eco Friendly' },
    { id: 4, name: 'Industry Leader' },
  ];

  return (
    <section className="part2-trust">
      <div className="trust-container">
        {/* Client Logos */}
        <div className="trust-section">
          <h2 className="trust-title">Trusted By Leading Companies</h2>
          <div className="client-logos">
            {clientLogos.map((logo) => (
              <div key={logo.id} className="logo-item">
                <div className="logo-placeholder">{logo.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="trust-section">
          <h2 className="trust-title">Certifications & Standards</h2>
          <div className="certificates">
            {certificates.map((cert) => (
              <div key={cert.id} className="cert-item">
                <div className="cert-placeholder">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Part2Trust;
