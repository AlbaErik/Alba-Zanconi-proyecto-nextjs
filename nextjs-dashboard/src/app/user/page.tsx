//"use client";
import React, { useState, useEffect } from 'react';
import fetchProducts from './components/datafetcher';
import { ProductWithCategory, fetchAllProducts } from "../lib/data";
import ProductCard from "./components/product_card"

export default async function Home() {
  /*
  const [productos,setProductos] = useState<ProductWithCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        setProductos(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  */

  var productos = await fetchAllProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-[3%] pl-[10%] pr-[10%]">
      <div id="productos" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
      {productos.map((product, index) => (
        <ProductCard 
          key={index}
          title={`${product.name}`} 
          price={`${product.price}$`}
          imageSrc ="/headphones.webp"
        />
      ))}
      </div>
    </main>
  );
}
