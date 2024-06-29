import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ProductoEnCarrito, useAppContext } from '@/app/context';

interface CardProps {
  name: string;
  price: number;
  id: string;
  imageSrc: string;
  description: string;
  category_name: string
  onButtonClick: () => void
}

const ProductCard: React.FC<CardProps> = ({ name, price, id, imageSrc, description, category_name, onButtonClick}) => {

  const { state, setState } = useAppContext();

  const handleButtonCLick = () => {
    agregarProducto();
    onButtonClick();
  }

  function agregarProducto(){
    let productos = [...state];
    let i=0;
    let encontre = false;
    while(!encontre && i<productos.length){
      if(productos[i].id===id){
        productos[i].quantity=productos[i].quantity+1;
        encontre = true;
      }
      i++;
    }
    if(!encontre){
      let producto: ProductoEnCarrito  = {
        id: id,
        title: name,
        description: description,
        unit_price: +price,
        picture_url: imageSrc,
        category_id: category_name,
        quantity: 1
      }
      productos.push(producto);
    }
    setState(productos);
  }
  
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white shadow-md">

      <div className="grid justify-items-center pt-3">
          <Image className="card-image" src={imageSrc} alt={name} width={200} height={30}/>
      </div>
      
      <Link href={{pathname: `/user/product/${id}`,}} className="flex px-[5%] text-xl font-semibold tracking-tight text-gray-900 hover:underline">
        {name}
      </Link>

      <div className="flex items-center justify-between mb-3 mt-3 pt-auto pb-3">
        <h3 className="pl-[5%] text-3xl font-bold text-gray-900 ">{"$"+price}</h3>
        <button onClick={handleButtonCLick} className="mr-[5%] pr-3 pl-3 overflow-hidden inline-block align-middle text-center text-white hover:bg-cyan-800 bg-cyan-700 rounded-lg h-8">
          Agregar
        </button>
      </div>
      
    </div>
  );
}

export default ProductCard;