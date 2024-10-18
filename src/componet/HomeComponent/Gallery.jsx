import React from 'react';
import './Hero.css';
import gallery1 from '../../assets/Galleryimage1.png';
import gallery2 from '../../assets/Galleryimage2.png';
import gallery3 from '../../assets/Galleryimage3.png';
import gallery5 from '../../assets/Galleryimage5.png';
import gallery6 from '../../assets/Galleryimage6.png';
import gallery7 from '../../assets/Galleryimage7.png';
import gallery8 from '../../assets/Galleryimage8.png';
import { Image } from 'antd';

const imageData = [
  {
    id: 1,
    title: 'Beautiful Landscape',
    src: gallery1,
    width: 2,
    height: 2,
  },
  {
    id: 2,
    title: 'Modern Architecture',
    src: gallery2,
    width: 1,
    height: 1,
  },
  {
    id: 3,
    title: 'City Lights',
    src: gallery3,
    width: 2,
    height: 1,
  },
  {
    id: 4,
    title: 'Mountain View',
    src: gallery5,
    width: 1,
    height: 2,
  },
  {
    id: 5,
    title: 'Mountain View',
    src: gallery6,
    width: 1,
    height: 2,
  },
  {
    id: 6,
    title: 'Mountain View',
    src: gallery7,
    width: 1,
    height: 2,
  },
  {
    id: 7,
    title: 'Mountain View',
    src: gallery8,
    width: 1,
    height: 2,
  },
];

export default function ImageGallery() {
  return (
    <>
    <div className='m-auto text-center mt-8'>
         <p className='font-semibold text-xl'>Share your setup with</p>
         <h1 className='text-4xl font-bold'>#FuniroFurniture</h1>
    </div>
    <div className="gallery-container">
       
      {imageData.map((image) => (
        <div
          key={image.id}
          className="gallery-item"
          style={{
            gridColumnEnd: `span ${image.width}`,
            gridRowEnd: `span ${image.height}`,
          }}
        >
          <Image src={image.src} alt={image.title} height={"100%"} style={{ 
            width: "100%", height: "100%",
  objectFit: "cover",
  display: "block"}} />
          <div className="image-title">{image.title}</div>
        </div>
      ))}
    </div>
    </>
  );
}






