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
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        {/* <div className="slideContents"> */}
        <img src={test1} alt='first slide' className="carousel-image" />
        {/* </div> */}
      </Carousel.Item>

      <Carousel.Item>
        {/* <div className="slideContents"> */}
        <img src={test2} className="carousel-image" />
        {/* </div> */}
      </Carousel.Item>

      <Carousel.Item>
        {/* <div className="slideContents"> */}
        <img src={test3} className="carousel-image" />
        {/* </div> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;