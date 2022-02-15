import { useCallback, useEffect, useState } from 'react';

const timeoutHandler = null;

const Modal = ({
  title,
  description,
  width = 'xs',
  no = 'no',
  yes = 'yes',
  isOpen = false,
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
      }, 1000);
    }
  }, [isOpen]);

  const opacity = useCallback(() => {
    return isOpen ? '' : 'opacity-0';
  });

  const display = useCallback(() => {
    return modalOpen ? 'fixed' : 'hidden';
  });

  return (
    <div
      className={
        'z-10 inset-0 overflow-y-auto bg-opacity-40 bg-black transition-opacity duration-1000 ' +
        opacity() +
        ' ' +
        display()
      }
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0' aria-hidden='true'></div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className={
            'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle p-6 ' +
            'max-w-' +
            width
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
          <div className='sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='flex-1 bg-softRed text-white uppercase inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
              {yes}
            </button>
            <button
              type='button'
              className='mt-3 flex-1 bg-grayBlue text-white uppercase inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
              onClick={onClose}
            >
              {no}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
