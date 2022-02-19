import React, { useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import AddComment from './AddComment';

const AddReply = ({ willShow }) => {
  const ref = useRef(null);

  const replyAnimation = useSpring({
    config: {
      tension: 250,
      friction: 22,
    },
    overflow: willShow ? 'none' : 'hidden',
    opacity: willShow ? 1 : 0,
    height: willShow ? ref.current.clientHeight : 0,
    transform: willShow ? 'translateY(0%)' : 'translateY(-100%)',
  });

  return (
    <animated.div
      style={replyAnimation}
      className={'w-full z-0' + ' ' + (willShow ? 'mt-4' : '')}
    >
      <AddComment sendText='reply' ref={ref}></AddComment>
    </animated.div>
  );
};

export default AddReply;
