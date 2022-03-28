import React from 'react';

function Card({ children, className }, ref) {
  return (
    <div className={className + ' bg-white rounded-md flex p-6 text-sm'} ref={ref}>
      {children}
    </div>
  );
}

const forwardedCard = React.forwardRef(Card);

export default forwardedCard;
