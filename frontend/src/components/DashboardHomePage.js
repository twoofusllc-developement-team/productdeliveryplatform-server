import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../styles/DashboardHomePage.css';


const sliderImages = [
  {
    id: 1,
    image: '/api/placeholder/800/400',
    title: 'Handcrafted Ceramic Vase',
    description: 'Beautiful artisan pottery'
  },
  {
    id: 2,
    image: '/api/placeholder/800/400',
    title: 'Wooden Jewelry Box',
    description: 'Handmade oak wood craftsmanship'
  },
  {
    id: 3,
    image: '/api/placeholder/800/400',
    title: 'Knitted Wool Scarf',
    description: 'Soft merino wool, locally made'
  }
];

const featuredProducts = [
  {
    id: 1,
    image: '/api/placeholder/250/250',
    name: 'Ceramic Coffee Mug',
    price: '$24.99'
  },
  {
    id: 2,
    image: '/api/placeholder/250/250',
    name: 'Leather Wallet',
    price: '$45.00'
  },
  {
    id: 3,
    image: '/api/placeholder/250/250',
    name: 'Woven Basket',
    price: '$32.50'
  },
  {
    id: 4,
    image: '/api/placeholder/250/250',
    name: 'Glass Pendant',
    price: '$18.75'
  }
];

const DashboardHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="dashboard-homepage">

      <NavigationBar isAuthenticated={true} />


      <section className="hero-slider">
        <div className="slider-container">
          <div className="slider-wrapper">
            {sliderImages.map((slide, index) => (
              <div 
                key={slide.id}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h2>{slide.title}</h2>
                    <p>{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-arrow prev" onClick={prevSlide}>
            &#8249;
          </button>
          <button className="slider-arrow next" onClick={nextSlide}>
            &#8250;
          </button>


          <div className="slider-dots">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>


      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHomePage;