// src/components/Background.js
import React from 'react';
import wallpaper from '../assets/wallpaper_026.png';

const Background = () => {
  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '200vh',
    backgroundImage: `url(${wallpaper})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
  };

  return <div style={style} />;
};

export default Background;
