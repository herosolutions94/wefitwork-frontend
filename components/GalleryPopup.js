import React from 'react';

const Gallery = ({ images }) => {

  return (
    <>
        <div id="my-gallery-popup">
        {images.map((image, index) => (
            <div key={index} href={image.large} data-lg-size={image.large} className='image_grid'>
            <img src={image.thumb} alt={`Image ${index + 1}`} />
            </div>
        ))}
    </div>
    </>
  );
};

export default Gallery;
