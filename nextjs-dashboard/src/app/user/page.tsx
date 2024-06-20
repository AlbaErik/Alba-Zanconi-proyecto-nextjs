"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from "./components/product_card"
import { ProductWithCategory } from '../lib/data';
import ReactPaginate from 'react-paginate';

export default function Home() {

  const handlePageClick = (data: {selected: number})  => {
    setPaginaActual(data.selected+1);
  }

  const CANTIDAD_PRODUCTOS_MOSTRADOS = 8;
  const [cantPaginas,setCantPaginas] = useState<number>(1);
  const [paginaActual,setPaginaActual] = useState<number>(1);
  const [productosMostrados,setProductosMostrados] = useState<ProductWithCategory[]>([]);
  const [productos,setProductos] = useState<ProductWithCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const dataLength = data.length;
        if(dataLength>0){
          setCantPaginas(Math.ceil(dataLength/CANTIDAD_PRODUCTOS_MOSTRADOS));
          setProductos(data);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //Use effect utilizado para mostrar las product cards correspondientes a la pagina en cuestion
  useEffect(() => {
    if(productos.length>0){
      let newProducts: ProductWithCategory[] =  [];
      let i = (paginaActual-1)*CANTIDAD_PRODUCTOS_MOSTRADOS;
      let j = Math.min(productos.length,i+CANTIDAD_PRODUCTOS_MOSTRADOS)
      for(i;i<j;i++){
        console.log("I:"+i)
        newProducts.push(productos[i]);
      }  
      setProductosMostrados(newProducts);
      
    }
  }, [productos, paginaActual]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-[3%] pl-[10%] pr-[10%]">
      <div id="productos" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
      {productosMostrados.map((_, index) => (
        <ProductCard 
          key={index}
          title={`${productosMostrados[index].name}`} 
          price={`${productosMostrados[index].price}`}
          id={`${productosMostrados[index].id}`}
          imageSrc ="/headphones.webp"
        />
      ))}
      </div>
      <ReactPaginate className="flex gap-5 mb-10"
        previousLabel={null}
        nextLabel={null}
        breakLabel={'...'}
        pageCount={cantPaginas}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={''}
        activeClassName={'text-blue-500'}
        pageClassName={'hover:underline'}
      />
  
    </main>
  );
}
