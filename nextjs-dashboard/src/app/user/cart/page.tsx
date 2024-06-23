"use client";
import CartCard from "./components/cart_card";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { ProductoEnCarrito, useAppContext } from "@/app/context";
import { useEffect, useState } from "react";

export default function Home() {
  
  const { state } = useAppContext();
  const [productos,setProductos] = useState<ProductoEnCarrito[]>([]);
  const [idPreferencia, setIdPreferencia] = useState<string>("");
  const [confirmarCarritoState, setConfirmarCarritoState] = useState<boolean>(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = "{ items:"+JSON.stringify(productos)+" }"

        const response = await fetch("/api/checkout",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: items
        });
        const preferencia = await response.json();
        setIdPreferencia(preferencia.id)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    if(confirmarCarritoState){
      fetchData();
      setConfirmarCarritoState(false)
    }
    
  },[confirmarCarritoState]);

  useEffect(() => {
  
    setProductos(state);
    initMercadoPago('APP_USR-cf082da5-a989-4d78-8c11-9b80f90da071', { locale: 'es-AR' });
    
  },[]);

  useEffect(() => {
    setProductos([...state]);
  }, [state]);

  const confirmarCarrito = async () => {
    if(productos.length!=0){
      setConfirmarCarritoState(true);
    }
    else{
      setIdPreferencia("");
    }
    
  };

    return (
      <main className="pt-[1%]">
        <div className="text-center text-5xl">
          Carrito
        </div>
        <div className="pt-[1%] w-3/4 sm:w-1/2 mx-auto">
          {productos.map((_, index) => (
          <CartCard
            key={index}
            id={`${productos[index].id}`}
            name={`${productos[index].title}`} 
            price={productos[index].unit_price}
            imageSrc ="/headphones.webp"
            cantidad={productos[index].quantity}
          />
          ))}
        </div>
        <div className="flex justify-center">
          <button onClick={confirmarCarrito} className="px-[2%] text-white hover:bg-blue-900 bg-blue-700 rounded-lg h-12">
            Confirmar Carrito
          </button>

        </div>
        <div className="flex justify-center mb-[20%]">
          <Wallet 
            initialization={{preferenceId: idPreferencia}} 
          />
        </div>
      </main>
    );
  }