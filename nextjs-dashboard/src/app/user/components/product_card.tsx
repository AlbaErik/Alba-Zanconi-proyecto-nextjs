import React from 'react';
import Image from "next/image";

interface CardProps {
  title: string;
  price: string;
  imageSrc: string;
}

const ProductCard: React.FC<CardProps> = ({ title, price, imageSrc }) => (
  <div className="card rounded-lg bg-blue-200 border-black border-2">
    <div className="flex justify-items-center">
        <Image className="card-image" src={imageSrc} alt={title} width={200} height={30}/>
    </div>
    
    <h2>{title}</h2>
    <h3>{price}</h3>
  </div>
);

export default ProductCard;