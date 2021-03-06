const MinusIcon = ({ isActive, className, width = 12, height = 11, ...otherProps }) => {
  return (
    <svg
      width={width}
      height={height}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${isActive ? 'text-darkBlue' : 'text-lightBlue'}`}
      {...otherProps}
    >
      <path
        d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
      />
    </svg>
  );
};

export default MinusIcon;
