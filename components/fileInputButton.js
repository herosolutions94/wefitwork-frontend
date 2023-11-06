import React, { useRef } from 'react';

function FileInputButton() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // You can do something with the selected file here
      console.log('Selected file:', selectedFile.name);
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
    </div>
  );
}

export default FileInputButton;
