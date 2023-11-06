import React, { useEffect } from 'react';
// import 'lightgallery.js/dist/css/lightgallery.min.css';
// import 'lightgallery.js/dist/js/lightgallery.min.js';

const Gallery = ({ images }) => {
    // useEffect(() => {
    //     lightGallery(document.getElementById('my-gallery'), {
    //       thumbnail: true,
    //     });
    //   }, []);

  return (
    <>
    {/* <div id="my-gallery">
      {images.map((image, index) => (
        <a key={index} href={image.large} data-lg-size={image.large} className='image_grid'>
          <img src={image.thumb} alt={`Image ${index + 1}`} />
        </a>
      ))}
    </div> */}
    
    </>
  );
};

export default Gallery;
