

import Landheroimg from '../../assets/land_hero_img1.jpg'
import './Hero.css'

function Hero(){
return(
    <div style={{backgroundImage:
        `url(${Landheroimg})`,
    height: "85vh",
    marginTop:"-10px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"}}
    className='p-20 flex justify-end items-end font-sans'>

    <div className='heroTextbox px-8 my-20 w-1/2 h-2/3 rounded-lg'>

        <div className='my-20'>
        <p style={{letterSpacing:2}} className='font-semibold'>New Arrivals</p>
        <h1 className='text-5xl font-bold w-[75%] my-1'>Discover Our New Collection</h1>
        <p style={{letterSpacing:1}} className='my-4 font-semibold '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aut architecto ipsam nisi</p>
        <button className='w-[40%] my-5 p-5'>Buy Now</button>
        </div>
    </div>

    </div>
)
}
export default Hero;