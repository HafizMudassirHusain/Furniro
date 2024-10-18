import { useEffect, useState } from 'react';
import image1 from '../../assets/rectangle24.png';
import image2 from '../../assets/rectangle25.png';

import './Hero.css';



const cardData = [
  {
    title: 'Room 1',
    description: 'Beautiful modern ',
    image: image1,
  },
  {
    title: 'Room 2',
    description: 'Cozy room ',
    image: image2,
  },
  {
    title: 'Room 3',
    description: 'Minimalist room ',
    image:image1,
  },
  {
    title: 'Room 4',
    description: 'Minimalist room ',
    image:image1,
  },
  // Add more card objects as needed
];





export default function Carousels(){

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--current-slide',
      currentSlide
    );
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === cardData.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? cardData.length - 1 : prevSlide - 1
    );
  };



return(
  <div className="parents h-[65vh] w-full py-14">

    <div className='flex justify-center w-[90%] mx-auto'> 

    <div className="content w-[400px] py-20 ">
     <h1 className='font-bold text-4xl mt-10 '>50+ Beautiful rooms inspiration</h1>
     <p className='text-sm mt-3'>Our designer already made a lot pf beautiful <br /> 
     prototips of rooms that inpiration you</p>
     <button className='w-[40%] my-5 px-5 py-3 text-white ' style={{backgroundColor:""}}>Explore More</button>
    </div>
    
    <div className="slider-container">
      {/* <button className="prev-btn" onClick={prevSlide}>
        &#10094;
      </button> */}
      <div className="slider">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
              <p className="card-description">{card.description}</p>
              <h2 className="card-title font-bold">{card.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="next-btn" onClick={nextSlide}>
        &#10095;
      </button>
    </div>

    </div>
  </div>
)
}


