// components/CarouselImage.js
import React from 'react';

function CarouselImage({ src, alt }) {
  return <img className="d-block w-100" src={src} alt={alt} />;
}

export default CarouselImage;
