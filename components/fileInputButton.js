import React, { useRef } from 'react';
import { useState } from 'react';

function FileInputButton({setFile}) {
  const fileInputRef = useRef(null);
  const [fileinput, setfileinput] =useState(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setFile(e);
      setfileinput(URL.createObjectURL(e.target.files[0]));
      
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelected}
      />
      <button type='button' className='file_upload site_btn' onClick={handleButtonClick}>
        <img src='/images/clip.svg' alt=''/><span>Choose your file</span>
        </button>
      {fileinput !== null &&
        <a href={fileinput} target='_blank' className="map_marker"><img src="/images/doc_file.png" alt="" style={{width: '5%'}}/></a>
      
      }

    </div>
  );
}

export default FileInputButton;
