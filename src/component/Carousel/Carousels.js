import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../../css/carousel.css';

import test1 from './img/test1.jpg';
import test2 from './img/test2.jpg';
import test3 from './img/test3.jpg';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={test1} alt="first slide" className="carousel-image" />
        </Carousel.Item>

        <Carousel.Item>
          <img src={test2} alt="second slide" className="carousel-image" />
        </Carousel.Item>

        <Carousel.Item>
          <img src={test3} alt="third slide" className="carousel-image" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
