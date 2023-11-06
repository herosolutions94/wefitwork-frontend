import React from 'react';

const PopupLarge = ({ isOpen, onClose, children }) => {
  return (
    <div className={`popup gallery_lg ${isOpen ? 'open' : ''}`}>
      <div className="table_dv">
        <div className='table_cell'>
            <div className='_inner'>
            <button className="x_btn" onClick={onClose}></button>
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PopupLarge;
