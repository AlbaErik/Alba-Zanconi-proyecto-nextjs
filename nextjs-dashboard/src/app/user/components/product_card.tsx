import React from 'react';
import Image from "next/image";

interface CardProps {
  title: string;
  price: string;
  imageSrc: string;
}

const ProductCard: React.FC<CardProps> = ({ title, price, imageSrc }) => (
  <div className="card rounded-lg bg-white shadow-md">
    <div className="grid justify-items-center">
        <Image className="card-image" src={imageSrc} alt={title} width={200} height={30}/>
    </div>
    
    <h2 className="pl-[5%] text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h2>
    <div className="flex items-center justify-between mb-3 mt-3">
      <h3 className="pl-[5%] text-3xl font-bold text-gray-900 dark:text-white">{price}</h3>
      <button className="mr-[5%] pr-3 pl-3 overflow-hidden inline-block align-middle text-center text-white hover:bg-cyan-800 bg-cyan-700 rounded-lg h-8">
        Agregar
      </button>
    </div>
    
  </div>
);

export default ProductCard;