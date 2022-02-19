import React from 'react';

function TextArea({
  className,
  placeholder = 'Add a comment..',
  ...props
}, ref) {
  return (
    <textarea
      className={
        'py-3 px-4 resize-none border border-gray-200 focus:outline-none focus:border-blue rounded-md w-full h-full flex-1' +
        ' ' +
        className
      }
      ref={ref}
      placeholder={placeholder}
      {...props}
    ></textarea>
  );
}

const forwardedTextArea = React.forwardRef(TextArea);

export default forwardedTextArea;
