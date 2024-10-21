import dining from '../../assets/dining.png';
import living from '../../assets/living.png';
import bedroom from '../../assets/hero_Lower3.png';
import '../Hero.css';

function HeroLower() {
  return (
    <div className='w-[90%] md:w-[83%] my-10 mx-auto' style={{ height: "70vh" }}>
      <h1 className='m-auto text-center text-3xl md:text-4xl font-bold'>Browse The Range</h1>
      <p className='text-center my-1 text-lg md:text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <div className='headspans flex flex-col md:flex-row justify-between my-10 h-[80%]'>
        <span className='spans w-full md:w-[32%] h-[80%] cursor-pointer mb-4 md:mb-0'>
          <img 
            src={dining} 
            alt="Dining" 
            className='rounded-lg'
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <h3 className='my-4 text-center font-bold text-xl'>Dining</h3>
        </span>
        <span className='spans w-full md:w-[32%] h-[80%] cursor-pointer mb-4 md:mb-0'>
          <img 
            src={living} 
            alt="Living" 
            className='rounded-lg'
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <h3 className='my-4 text-center font-bold text-xl'>Living</h3>
        </span>
        <span className='spans w-full md:w-[32%] h-[80%] cursor-pointer'>
          <img 
            src={bedroom} 
            alt="Bedroom" 
            className='rounded-lg'
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <h3 className='my-4 text-center font-bold text-xl'>Bedroom</h3>
        </span>
      </div>
    </div>
  );
}

export default HeroLower;
