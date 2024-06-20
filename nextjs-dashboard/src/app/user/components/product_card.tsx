"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useAppContext } from '@/app/context';

interface CardProps {
  title: string;
  price: string;
  id: string;
  imageSrc: string;
}

const ProductCard: React.FC<CardProps> = ({ title, price, id, imageSrc }) => {

  const { state, setState }= useAppContext();
  const [executeEffect, setExecuteEffect] = useState(false);

  function productoEnCarrito(): boolean{
    let toReturn = false;
    /*
    state.forEach(element => {
      if(element.id===id){
        toReturn = true;
        break;
      }
      
    });
    */

    return toReturn;
  }

  useEffect(() => {
    if(executeEffect){
      const fetchData = async () => {
        try {
          const response = await fetch("/api/product?id="+id);
          const data = await response.json();
          if(productoEnCarrito()){
            
          }
          else{

          }
          setState(state.push(data));
          console.log("Cart State: "+JSON.stringify(state));
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      setExecuteEffect(false);
    }
  }, [executeEffect]);
  
  const handleButtonClick = () => {
    setExecuteEffect(true);
  };
  
  return (
    <div className="card rounded-lg bg-white shadow-md">
      <div className="grid justify-items-center">
          <Image className="card-image" src={imageSrc} alt={title} width={200} height={30}/>
      </div>
      
      <Link href={{pathname: `/user/product/${id}`,}} className="flex px-[5%] text-xl font-semibold tracking-tight text-gray-900 hover:underline">
        {title}
      </Link>
      <div className="flex items-center justify-between mb-3 mt-3">
        <h3 className="pl-[5%] text-3xl font-bold text-gray-900 ">{"$"+price}</h3>
        <button onClick={handleButtonClick} className="mr-[5%] pr-3 pl-3 overflow-hidden inline-block align-middle text-center text-white hover:bg-cyan-800 bg-cyan-700 rounded-lg h-8">
          Agregar
        </button>
      </div>
      
    </div>
  );
}

export default ProductCard;