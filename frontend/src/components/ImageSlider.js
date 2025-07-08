import React from 'react';
import Slider from 'react-slick';
import slide1 from '../assets/h1.jpg';
import slide2 from '../assets/h4.jpg';
import slide3 from '../assets/h3.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
  const images = [slide1, slide2, slide3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Slider {...settings}>
        {images.map((url, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              src={url}
              alt={`slide-${index}`}
              style={{ width: '100%', height: '90vh', objectFit: 'cover' }}
            />
            {/*
            // Example overlay text
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: '20px',
              borderRadius: '10px'
            }}>
              <h2>Discover Handmade Beauty</h2>
            </div>
            */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
