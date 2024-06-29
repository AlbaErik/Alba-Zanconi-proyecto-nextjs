import React from 'react';
import Image from "next/image";
import { useAppContext } from '@/app/context';

interface CardProps {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  cantidad: number
  setModalOpen: (flag: boolean) => void;
  setIndiceProductoAEliminar: (flag: number) => void;
}

const CartCard: React.FC<CardProps> = ({ id, name, price, imageSrc, cantidad, setModalOpen, setIndiceProductoAEliminar }) =>{

  const {state, setState} = useAppContext();

  function addProduct(){
    let productos = [...state];
    let i=0;
    let encontre = false;
    while(!encontre){
      if(productos[i].id===id){
        productos[i].quantity=productos[i].quantity+1;
        encontre = true;
      }
      i++;
    }
    setState(productos);
  }

  function removeProduct(){
    try{
      let productos = [...state];
      let i=0;
      let encontre = false;
      let elimine = false;
      while(!encontre){
        if(productos[i].id===id){
          if(productos[i].quantity===1){
            setIndiceProductoAEliminar(i);
            setModalOpen(true);
          }
          else{
            productos[i].quantity=productos[i].quantity-1;
            elimine=true;
          }
          encontre = true;
        }
        i++;
      }
      if(elimine){
        setState(productos);
      }
    }
    catch{}
  }

  return(
  <div className="grid grid-cols-4 gap-4 rounded-lg mb-[1%] border-black border-4 py-5 px-3">
    <div className="flex justify-items-center">
        <Image className="card-image" src={imageSrc} alt={name} width={100} height={30}/>
    </div>
    
    <div className="flex items-center justify-center text-xl font-semibold tracking-tight text-gray-900 ">
        {name}
    </div>

    <div className="flex items-center justify-center text-3xl font-bold text-gray-900 ">{"$"+price}</div>
    
    <div className="flex items-center justify-evenly">
        <button onClick={addProduct} className="flex overflow-hidden items-center justify-center text-5xl font-bold text-gray-900 hover:bg-green-500 rounded-lg h-8">
            +
        </button>
        <div className="flex items-center justify-center text-4xl font-bold text-gray-900 tracking-tight  h-8">
            {cantidad}
        </div>
        <button onClick={removeProduct} className="flex overflow-hidden items-center justify-center text-3xl font-bold text-gray-900 hover:bg-red-500 rounded-lg h-8">
            -
        </button>
    </div>
    
  </div>
  );
}
export default CartCard;