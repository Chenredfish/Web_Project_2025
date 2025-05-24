// src/components/Pokedex.js
import React from 'react';
import './Pokedex.css';

const Pokedex = ({ mushrooms = [], page = 1, onPageChange = () => {} }) => {
  const itemsPerPage = 3;
  const startIndex = (page - 1) * itemsPerPage;
  const currentPageItems = mushrooms.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(mushrooms.length / itemsPerPage);

  return (
    <div className="pokedex-container">
      <h3 style={{ margin: '0 0 10px' }}>收集到的菇菇總數：{mushrooms.length}</h3>
      <div className="pokedex-grid">
        {Array.from({ length: itemsPerPage }).map((_, index) => {
          const data = currentPageItems[index];
          return (
            <div key={index} className="pokedex-card">
              {data ? (
                <>
                  <img src={data.image}  alt={data.name} style={{ height: '80px' } } />
                  <div style={{ marginTop: '16px' }}>{data.name}</div>
                  <div>NP: {data.NP}</div>
                  <div>{data.rare}</div>
                  <div>採集數量: </div>
                </>
              ) : (
                <>
                  <div style={{ opacity: 0.2 }}>❓</div>
                  <div>名稱:</div>
                  <div>NP:</div>
                  <div>稀有度:</div>
                  <div>採集數量: </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="pokedex-nav">
        <span onClick={() => onPageChange(page > 1 ? page - 1 : 1)}>←</span>
        <span>{page}</span>
        <span onClick={() => onPageChange(page < totalPages ? page + 1 : page)}>→
        </span>
      </div>
    </div>
  );
};

export default Pokedex;
