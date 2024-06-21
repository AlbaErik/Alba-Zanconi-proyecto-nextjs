"use client";
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
}

const ProductCard: React.FC<CardProps> = ({ name, price, id, imageSrc, description, category_name}) => {
  const { state, setState } = useAppContext();
  const [executeEffect, setExecuteEffect] = useState(false);

  const handleButtonClick = () => {
      setExecuteEffect(true);
  };

  function buscarProductoEnCarrito(): number{
    let indice = 0;
    let i = 0;
    while(indice === 0 && i<state.length){
      if(state[i].id===id){
        indice = i;
      }
      else{
        i++
      }
    }
    return indice;
  }

  useEffect(() => {
    const agregarProducto = async () => {
      if(executeEffect){
        let productos: ProductoEnCarrito[] = [...state];
        let indice = buscarProductoEnCarrito();
        
        //Se ejecuta cuando el indice es distinto de 0 (El producto estaba en el carrito)
        if(indice){
          productos[indice].quantity=productos[indice].quantity+1;
        }
        else{
          let producto: ProductoEnCarrito  = {
            id: id,
            name: name,
            description: description,
            price: price,
            image_url: imageSrc,
            category_name: category_name,
            quantity: 1
          }
          productos.push(producto);
        }

        setState(productos);

        console.log("Carrito:");
        for(let i=0;i<state.length;i++){
          console.log("Producto: "+state[i].name+" Cantidad: "+state[i].quantity);
        }
        
        setExecuteEffect(false);
      }
    }

    agregarProducto();
  }, [executeEffect]);
  
  return (
    <div className="card rounded-lg bg-white shadow-md">

      <div className="grid justify-items-center">
          <Image className="card-image" src={imageSrc} alt={name} width={200} height={30}/>
      </div>
      
      <Link href={{pathname: `/user/product/${id}`,}} className="flex px-[5%] text-xl font-semibold tracking-tight text-gray-900 hover:underline">
        {name}
      </Link>

      <div className="flex items-center justify-between mb-3 mt-3">
        <h3 className="pl-[5%] text-3xl font-bold text-gray-900 ">{"$"+price}</h3>
        <button onClick={handleButtonClick} disabled={false} className="mr-[5%] pr-3 pl-3 overflow-hidden inline-block align-middle text-center text-white hover:bg-cyan-800 bg-cyan-700 rounded-lg h-8">
          Agregar
        </button>
      </div>
      
    </div>
  );
}

export default ProductCard;