import React from 'react';

const StartButton = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
        Empezar
      </button>
    </div>
  );
};

export default StartButton;