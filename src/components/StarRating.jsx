import React from 'react';

const StarRating = ({ rating, setRating }) => {
  return (
    <div style={{ display: 'flex', gap: '5px', margin: '5px 0' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            color: star <= rating ? 'gold' : '#ccc'
          }}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
