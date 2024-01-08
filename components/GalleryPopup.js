import React from 'react';
import { cmsFileUrl } from '../helpers/helpers';

const Gallery = ({ images }) => {

  return (
    <>
        <div id="my-gallery-popup">
        {images.map((image, index) => (
            <div key={index} href={cmsFileUrl(image.image, 'members/portfolio')} data-lg-size={cmsFileUrl(image.image, 'members/portfolio')} className='image_grid'>
            <img src={cmsFileUrl(image.image, 'members/portfolio')} alt={`Image ${index + 1}`} />
            </div>
        ))}
    </div>
    </>
  );
};

export default Gallery;
