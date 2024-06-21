import React from 'react';
import Image from "next/image";

interface CardProps {
  name: string;
  price: string;
  imageSrc: string;
  cantidad: number
}

const CartCard: React.FC<CardProps> = ({ name, price, imageSrc, cantidad }) => (
  <div className="flex justify-evenly rounded-lg mb-[1%] border-black border-4">
    <div className="flex justify-items-center">
        <Image className="card-image" src={imageSrc} alt={name} width={100} height={30}/>
    </div>
    
    <div className="flex items-center justify-center text-xl font-semibold tracking-tight text-gray-900 ">
        {name}
    </div>

    <div className="flex items-center justify-center text-3xl font-bold text-gray-900 ">{price}</div>
    <div className="flex items-center justify-evenly">
        <button className="flex overflow-hidden items-center justify-center text-3xl font-bold text-gray-900 hover:bg-green-500 rounded-lg h-8">
            +
        </button>
        <div className="flex items-center justify-center text-2xl font-bold text-gray-900 tracking-tight  h-8">
            {cantidad}
        </div>
        <button className="flex overflow-hidden items-center justify-center text-3xl font-bold text-gray-900 hover:bg-red-500 rounded-lg h-8">
            -
        </button>
    </div>
    
  </div>
);

export default CartCard;