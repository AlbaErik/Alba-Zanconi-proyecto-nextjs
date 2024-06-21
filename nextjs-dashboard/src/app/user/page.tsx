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
        if(data.length>0){
          setCantPaginas(Math.ceil(data.length/CANTIDAD_PRODUCTOS_MOSTRADOS));
          setProductos(data);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //Use effect utilizado para mostrar las product cards correspondientes al numero de pagina en cuestion
  useEffect(() => {
    if(productos.length>0){
      let newProducts: ProductWithCategory[] = [];
      let i = (paginaActual-1)*CANTIDAD_PRODUCTOS_MOSTRADOS;
      let j = Math.min(productos.length,i+CANTIDAD_PRODUCTOS_MOSTRADOS)
      for(i;i<j;i++){
        newProducts.push(productos[i]);
      }  
      setProductosMostrados(newProducts);
    }
  }, [productos, paginaActual]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-[3%] pl-[10%] pr-[10%]">
      <div id="productos" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
      {productosMostrados.map((_, index) => (
        <ProductCard 
          key={index}
          name={`${productosMostrados[index].name}`} 
          price={productosMostrados[index].price}
          id={`${productosMostrados[index].id}`}
          imageSrc ="/headphones.webp"
          description={`${productosMostrados[index].description}`} 
          category_name={`${productosMostrados[index].category_name}`} 
        />
      ))}
      </div>
      <ReactPaginate className="flex gap-5 mb-10 pt-5"
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
