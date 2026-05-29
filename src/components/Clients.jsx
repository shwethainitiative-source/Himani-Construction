import React from 'react';
import './Clients.css';

const Clients = () => {
  // Staged client logos, duplicated to make exactly 12 items
  const clientLogos = [
    { id: 1, name: "Public Works Department, Karnataka", src: "/images/clients/client_1.png" },
    { id: 2, name: "NMKRV College for Women", src: "/images/clients/client_2.png" },
    { id: 3, name: "BMS College of Engineering", src: "/images/clients/client_3.jpg" },
    { id: 4, name: "National Health Mission, Karnataka", src: "/images/clients/client_4.png" },
    { id: 5, name: "e-Swathu, Panchayat Raj Karnataka", src: "/images/clients/client_5.jpg" },
    { id: 6, name: "Public Works Department, Karnataka", src: "/images/clients/client_1.png" },
    { id: 7, name: "NMKRV College for Women", src: "/images/clients/client_2.png" },
    { id: 8, name: "BMS College of Engineering", src: "/images/clients/client_3.jpg" },
    { id: 9, name: "National Health Mission, Karnataka", src: "/images/clients/client_4.png" },
    { id: 10, name: "e-Swathu, Panchayat Raj Karnataka", src: "/images/clients/client_5.jpg" },
    { id: 11, name: "Public Works Department, Karnataka", src: "/images/clients/client_1.png" },
    { id: 12, name: "NMKRV College for Women", src: "/images/clients/client_2.png" }
  ];

  return (
    <section className="clients" id="clients">
      <div className="container">
        <h4 className="clients-subtitle">OUR CLIENTS</h4>
        <h2 className="clients-title">Trusted by Leading Organizations</h2>
        
        <div className="clients-marquee-container">
          <div className="clients-marquee">
            <div className="clients-track">
              {/* Group 1 */}
              <div className="clients-group">
                {clientLogos.map((logo, idx) => (
                  <div className="client-logo-card" key={`group-1-${idx}`}>
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      title={logo.name}
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
              
              {/* Group 2 (Identical duplicate for seamless looping) */}
              <div className="clients-group" aria-hidden="true">
                {clientLogos.map((logo, idx) => (
                  <div className="client-logo-card" key={`group-2-${idx}`}>
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      title={logo.name}
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
