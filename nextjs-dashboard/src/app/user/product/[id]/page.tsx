"use client";
import Image from "next/image";
import AddToCartButton from "./components/add_cart_button";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { ProductWithCategory } from "@/app/lib/data";

export default function Home() {
  const params = useParams();
  const [name,setName] = useState<string>("");
  const [description,setDescription] = useState<string>("");
  const [price,setPrice] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/product?id="+params.id);
        const data = await response.json();
        setName(data.name);
        setDescription(data.description);
        setPrice("$"+data.price);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  var imageSrc="/headphones.webp";
  
  return (
    <main className="pt-[3%] px-[15%]">
      <div className="md:flex py-3 px-3 border-black border-4 rounded-lg w-full">
          <div className="lg:flex mr-3 pb-[1%]">
            <Image className="card-image flex-none" src={imageSrc} alt={name} width={400} height={10}/>
          </div>
          <div className="my-[1%] px-[1%] w-full flex flex-col rounded-lg shadow-md bg-white">
            
            <div className="text-5xl">
              {name}
            </div>
            
            <div className="text-2xl pt-3">
              {description}
            </div>
            <div className="text-4xl mt-auto">
              {price}
            </div>

            <div className="flex justify-center mt-auto pb-2 ">
              <AddToCartButton/>
            </div>
          </div>
      
        
      </div>
    </main>
  );
}
