import { useEffect, useState } from 'react';
import image1 from '../../assets/rectangle24.png';
import image2 from '../../assets/rectangle25.png';

import '../Hero.css';



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
  <div className="parents h-auto w-full py-14 flex flex-col items-center">
  <div className='flex flex-col md:flex-row justify-center w-[90%] mx-auto'> 
    <div className="content w-full md:w-[400px] py-20">
      <h1 className='font-bold text-4xl mt-10'>50+ Beautiful Rooms Inspiration</h1>
      <p className='text-sm mt-3'>Our designers have created many beautiful prototypes of rooms to inspire you.</p>
      <button className='w-[80%] md:w-[40%] my-5 px-5 py-3 text-white bg-yellow-500 rounded'>
        Explore More
      </button>
    </div>
    
    <div className="slider-container">
      <div className="slider">
        {cardData.map((card, index) => (
          <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            <div className="card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h2 className="card-title font-bold">{card.title}</h2>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <button className="prev-btn" onClick={prevSlide}>&#10094;</button> */}
      <button className="next-btn" onClick={nextSlide}>&#10095;</button>
    </div>
  </div>
</div>

)
}


