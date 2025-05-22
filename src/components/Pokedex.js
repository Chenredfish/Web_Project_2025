// src/components/Pokedex.js
//import React from 'react';
//import './Pokedex.css';

//const Pokedex = ({ isOpen, onClose, data }) => {
  //if (!isOpen) return null;

  //return (
    //<div className="pokedex-wrapper">
      //<div className="pokedex-header">
        //<button className="circle-button" onClick={onClose}>圖鑑</button>
        //<h2>收集到的菇菇總數:</h2>
      //</div>
      //<div className="pokedex-grid">
        //{data.map((item, index) => (
          //<div className="pokedex-item" key={index}>
            //<div className="item-img" />
            //<div className="item-label">名稱: {item.name}</div>
            //<div className="item-label">總數: {item.count}</div>
          //</div>
        //))}
      //</div>
      //<div className="pagination">
        //<span>1</span>
        //<span className="arrow">→</span>
      //</div>
    //</div>
  //);
//};

//export default Pokedex;

// src/components/Pokedex.js
import React from 'react';

const containerStyle = {
  position: 'absolute',
  top: 80,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
  maxWidth: 500,
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  zIndex: 10,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: 10,
};

const cardStyle = {
  backgroundColor: '#ccc',
  height: 80,
  borderRadius: 6,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 14,
};

const pageNavStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 10,
  fontSize: 18,
  cursor: 'pointer',
};

const Pokedex = ({ mushrooms = [], page = 1, onPageChange = () => {} }) => {
  const itemsPerPage = 16;
  const startIndex = (page - 1) * itemsPerPage;
  const currentPageItems = mushrooms.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: '0 0 10px' }}>收集到的菇菇總數：</h3>
      <div style={gridStyle}>
        {Array.from({ length: itemsPerPage }).map((_, index) => {
          const data = currentPageItems[index];
          return (
            <div key={index} style={cardStyle}>
              {data ? (
                <>
                  <div>{data.icon || '🍄'}</div>
                  <div>名稱: {data.name}</div>
                  <div>總數: {data.count}</div>
                </>
              ) : (
                <>
                  <div style={{ opacity: 0.2 }}>❓</div>
                  <div>名稱:</div>
                  <div>總數:</div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div style={pageNavStyle}>
        <span onClick={() => onPageChange(page - 1)}>←</span>
        <span>{page}</span>
        <span onClick={() => onPageChange(page + 1)}>→</span>
      </div>
    </div>
  );
};

export default Pokedex;
