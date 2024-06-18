"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from "../components/product_card"
import { ProductWithCategory } from '../../lib/data';
import { useParams } from 'next/navigation';

export default function Home() {
  const params = useParams();
  const [productos,setProductos] = useState<ProductWithCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products?category_name="+params.category);
        const data = await response.json();
        if(response.status!==500){
          setProductos(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-[3%] pl-[10%] pr-[10%]">
      <div id="productos" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
      {productos.map((_, index) => (
        <ProductCard 
          key={index}
          title={`${productos[index].name}`} 
          price={`${productos[index].price}`}
          id={`${productos[index].id}`}
          imageSrc ="/headphones.webp"
        />
      ))}
      </div>
    </main>
  );
}