import Card from '../Card';
import MinusIcon from '../Icons/MinusIcon';
import PlusIcon from '../Icons/PlusIcon';

export default function CommentLoader({ isVisible }) {
  if (!isVisible) {
    return <></>;
  }

  return (
    <div className='animate-pulse w-full'>
      {Array.from(Array(4), (e, i) => (
        <Card className='mt-4 z-10 w-full'>
          {/* Votes */}
          <div>
            <div className='bg-gray-100 p-2 rounded-md text-center font-semibold text-violet-800 flex flex-col items-center'>
              <div className='cursor-pointer mb-2'>
                <PlusIcon />
              </div>
              <div className='mb-1 text-blue font-medium'>0</div>
              <div className='cursor-pointer mt-1'>
                <MinusIcon className='ml-1' />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 ml-6 w-full'>
            {/* Title */}
            <div className='flex mb-3 items-center'>
              <div class='rounded-full bg-slate-300 h-6 w-6'></div>
              <div class='ml-4 h-2 w-52 bg-slate-300 rounded'></div>
              <div className='flex-1'>
                <div class='ml-4 h-2 w-28 bg-slate-300 rounded'></div>
              </div>
            </div>
            {/* Description */}
            <div className='text-grayBlue w-full'>
              <div className='grid grid-cols-4 gap-4 mb-4'>
                <div class='h-2 bg-slate-300 rounded col-span-2'></div>
                <div class='h-2 bg-slate-300 rounded col-span-1'></div>
                <div class='h-2 bg-slate-300 rounded col-span-1'></div>
              </div>
              <div className='grid grid-cols-3 gap-4 mb-4'>
                <div class='h-2 bg-slate-300 rounded col-span-2'></div>
                <div class='h-2 bg-slate-300 rounded col-span-1'></div>
              </div>
              <div className='grid grid-cols-3 gap-4 mb-4'>
                <div class='h-2 bg-slate-300 rounded col-span-1'></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
