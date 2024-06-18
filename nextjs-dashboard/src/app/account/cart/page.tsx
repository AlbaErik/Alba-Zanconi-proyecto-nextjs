"use client";
import CartCard from "./components/cart_card";
import CheckoutButton from "./components/checkout_button";
import { AppWrapper, useAppContext } from "@/app/context";

export default function Home() {
  const {} = useAppContext();
  const cards = Array.from({ length: 5 });
    return (
      <main className="pt-[1%]">
        <div className="text-center text-5xl">
          Carrito
        </div>
        <div className="pt-[1%] w-3/4 sm:w-1/2 mx-auto">
          {cards.map((_, index) => (
          <CartCard
            key={index}
            title={`Producto ${index + 1}`} 
            price={`${index + 1}$`}
            imageSrc ="/headphones.webp"
            cantidad={1}
          />
          ))}
        
        </div>

        <div className="flex justify-center mb-[20%]">
          <CheckoutButton/>
        </div>
      </main>
    );
  }