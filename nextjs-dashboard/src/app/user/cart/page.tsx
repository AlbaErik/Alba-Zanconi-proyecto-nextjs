"use client";
import CartCard from "./components/cart_card";
import CheckoutButton from "./components/checkout_button";
import { ProductoEnCarrito, useAppContext } from "@/app/context";
import { useEffect, useState } from "react";

export default function Home() {
  
  const { state } = useAppContext();
  const [productos,setProductos] = useState<ProductoEnCarrito[]>([]);

  useEffect(() => {
    console.log("Use effect carrito render");
    console.log("Carrito:"+JSON.stringify(state));
    setProductos(state);
  
  },);

  useEffect(() => {
    
  }, [productos]);

    return (
      <main className="pt-[1%]">
        <div className="text-center text-5xl">
          Carrito
        </div>
        <div className="pt-[1%] w-3/4 sm:w-1/2 mx-auto">
          {productos.map((_, index) => (
          <CartCard
            key={index}
            name={`${state[index].name}`} 
            price={`$${state[index].price}`}
            imageSrc ="/headphones.webp"
            cantidad={state[index].quantity}
          />
          ))}
        
        </div>

        <div className="flex justify-center mb-[20%]">
          <CheckoutButton/>
        </div>
      </main>
    );
  }