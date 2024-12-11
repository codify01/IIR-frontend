import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center col-span-2">
      <div className="w-12 h-12 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
