import React, { useState } from 'react';

const containerStyle = {
  position: 'fixed',
  left: 24,
  bottom: 24,
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const buttonStyle = {
  backgroundColor: '#76aeb2',
  borderRadius: '50%',
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  fontWeight: 'bold',
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
};

const menuStyle = {
  marginTop: 8,
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 90,
};

const optionStyle = {
  padding: '8px 16px',
  border: 'none',
  background: 'none',
  color: '#333',
  fontSize: 15,
  textAlign: 'left',
  cursor: 'pointer',
  borderRadius: 8,
  margin: 2,
};

const options = [
  { label: '1 秒', value: 1000 },
  { label: '5 秒', value: 5000 },
  { label: '10 秒', value: 10000 },
  { label: '60 秒', value: 60000 },
];

const IntervalSelector = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const currentLabel = options.find(opt => opt.value === value)?.label || `${value / 1000} 秒`;

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={() => setOpen(o => !o)}>
        <div>間隔</div>
        <div style={{ fontSize: 16 }}>{currentLabel}</div>
      </button>
      {open && (
        <div style={menuStyle}>
          {options.map(opt => (
            <button
              key={opt.value}
              style={optionStyle}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntervalSelector;