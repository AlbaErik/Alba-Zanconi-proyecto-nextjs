import React from 'react';

interface ChildComponentProps {
  onButtonClick: () => void;
}

const AddToCartButton: React.FC<ChildComponentProps> = ({onButtonClick}) => {
  return (
    <button onClick={onButtonClick} className="px-[2%] text-white hover:bg-blue-900 bg-blue-700 rounded-lg h-12">Agregar a carrito</button>
  );
}

export default AddToCartButton;