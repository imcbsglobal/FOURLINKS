import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.scss';

const GalleryBanner = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filters = ['ALL', 'LOCATION', 'VILLAS', 'FACILITIES', 'ACTIVITIES', 'CULINARY', 'FEEDBACK'];

  const images = [
    { id: 1, category: 'LOCATION', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
    { id: 2, category: 'LOCATION', url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80' },
    { id: 3, category: 'LOCATION', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80' },
    { id: 4, category: 'VILLAS', url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80' },
    { id: 5, category: 'VILLAS', url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80' },
    { id: 6, category: 'VILLAS', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
    { id: 7, category: 'FACILITIES', url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80' },
    { id: 8, category: 'FACILITIES', url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80' },
    { id: 9, category: 'FACILITIES', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80' },
    { id: 10, category: 'ACTIVITIES', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80' },
    { id: 11, category: 'ACTIVITIES', url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80' },
    { id: 12, category: 'ACTIVITIES', url: 'https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?w=800&q=80' },
    { id: 13, category: 'CULINARY', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
    { id: 14, category: 'CULINARY', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' },
    { id: 15, category: 'CULINARY', url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80' },
    { id: 16, category: 'FEEDBACK', url: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80' },
    { id: 17, category: 'FEEDBACK', url: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=800&q=80' },
    { id: 18, category: 'FEEDBACK', url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80' }
  ];

  const filteredImages = activeFilter === 'ALL' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Navigate to previous image
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next image
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  return (
    <>
      <div className="gallery-banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1 className="banner-title">Our Gallery</h1>
          <p className="banner-subtitle">Explore our stunning collection of moments</p>
        </div>
      </div>

      <div className="explore-gallery">
        <div className="gallery-header">
          <h2 className="gallery-title">THE EXCEPTIONAL PART</h2>
          <h1 className="gallery-subtitle">EXPLORE GALLERY</h1>
          <div className="title-divider">
            <svg width="70" height="20" viewBox="0 0 70 20">
              <line x1="0" y1="10" x2="25" y2="10" stroke="#b8986a" strokeWidth="1"/>
              <circle cx="35" cy="10" r="6" fill="none" stroke="#b8986a" strokeWidth="1"/>
              <line x1="45" y1="10" x2="70" y2="10" stroke="#b8986a" strokeWidth="1"/>
            </svg>
          </div>
        </div>

        <div className="filter-buttons">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img src={image.url} alt={image.category} />
              <div className="gallery-overlay">
                <span className="overlay-icon">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={32} />
          </button>

          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft size={40} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[currentImageIndex].url} 
              alt={filteredImages[currentImageIndex].category}
              className="lightbox-image"
            />
            <div className="lightbox-info">
              <span className="lightbox-category">
                {filteredImages[currentImageIndex].category}
              </span>
              <span className="lightbox-counter">
                {currentImageIndex + 1} / {filteredImages.length}
              </span>
            </div>
          </div>

          <button 
            className="lightbox-nav lightbox-next" 
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  );
};

export default GalleryBanner;