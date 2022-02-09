export default function Card({ children, className }) {
  return (
    <div
      className={'bg-white rounded-md flex p-6 text-sm' + ' ' + className}
    >
      {children}
    </div>
  );
}
