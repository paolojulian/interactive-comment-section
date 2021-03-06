import { useCallback, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Button from './Button';

const timeoutHandler = null;

const Modal = ({
  title,
  description,
  no = 'no',
  yes = 'yes',
  isOpen = false,
  isLoading = false,
  onYes = () => {},
  onClose = () => {},
}) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    clearTimeout(timeoutHandler);
    if (isOpen) {
      setModalOpen(true);
    } else {
      timeoutHandler = setTimeout(() => {
        setModalOpen(false);
      }, 120);
    }
  }, [isOpen]);

  const display = useCallback(() => {
    return modalOpen ? 'fixed' : 'hidden';
  }, [modalOpen]);

  const animation = useSpring({
    config: {
      duration: 120,
    },
    opacity: isOpen ? 1 : 0,
  });

  return (
    <div
      className={
        'z-50 inset-0 overflow-y-auto bg-opacity-40 bg-black ' + display()
      }
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <animated.div style={animation}>
        <div className='flex items-center md:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0' aria-hidden='true'></div>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          {/* Card */}
          <div
            className={
              'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle p-6 max-w-xs'
            }
          >
            <div className='sm:flex sm:items-start mb-4'>
              <div className='text-left'>
                <h3 className='text-lg leading-6 font-medium' id='modal-title'>
                  {title}
                </h3>
                <div className='mt-6'>
                  <p className='text-sm text-grayBlue'>{description}</p>
                </div>
              </div>
            </div>
            <div className='flex mt-4'>
              <button
                type='button'
                className='flex-1 bg-grayBlue text-base text-white uppercase inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                onClick={onClose}
              >
                {no}
              </button>
              <Button
                className='flex-1 bg-softRed text-base text-white uppercase inline-flex ml-2 justify-center rounded-md border border-red-400 shadow-sm px-4 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                isLoading={isLoading}
                onClick={onYes}
              >
                {yes}
              </Button>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Modal;
