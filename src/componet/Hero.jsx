import Landheroimg from '../assets/land_hero_img1.jpg';
import './Hero.css';

function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(${Landheroimg})`,
        height: "85vh",
        marginTop: "-10px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
       
      }}
      className="p-10 lg:w-full md:w-full flex justify-end items-end font-sans"
    >
      <div className="heroTextbox px-4 md:px-8 my-20 w-full md:w-1/2 h-2/3 rounded-lg bg-opacity-80">
        <div className="my-10 md:my-20">
          <p style={{ letterSpacing: 2 }} className="font-semibold text-lg md:text-xl text-left">New Arrivals</p>
          <h1 className="text-3xl md:text-5xl font-bold w-full md:w-[75%] my-1">Discover Our New Collection</h1>
          <p style={{ letterSpacing: 1 }} className="my-4 font-semibold text-sm md:text-base text-left">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aut architecto ipsam nisi
          </p>
          <button className="w-full md:w-[40%] my-5 p-3 md:p-5 bg-yellow-500 text-white rounded-md">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
