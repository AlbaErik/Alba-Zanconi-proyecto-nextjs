"use client";
import Image from "next/image";
import AddToCartButton from "./components/add_cart_button";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { ProductoEnCarrito, useAppContext } from "@/app/context";
import { ProductWithCategory } from "@/app/lib/data";
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const params = useParams();
  const [productoAgregado,setProductoAgregado] = useState<boolean>();
  const [producto,setProducto] = useState<ProductWithCategory>({
    id: "",
    name: "",
    description: "",
    price: 0,
    image_url: "",
    category_name: "",
  });

  const { state, setState } = useAppContext();

  const agregarProductoCarrito = () => {
    agregarProducto();
    setProductoAgregado(true);
  };

  function agregarProducto(){
    let productos = [...state];
    let i=0;
    let encontre = false;
    while(!encontre && i<productos.length){
      if(productos[i].id===producto.id){
        productos[i].quantity=productos[i].quantity+1;
        encontre = true;
      }
      i++;
    }
    if(!encontre){
      let newProduct: ProductoEnCarrito  = {
        id: producto.id,
        title: producto.name,
        description: producto.description,
        unit_price: +producto.price,
        picture_url: producto.image_url,
        category_id: producto.category_name,
        quantity: 1
      }
      productos.push(newProduct);
    }
    setState(productos);
  }

  useEffect(() => {
    
    if(productoAgregado){
      toast("Producto agregado a carrito exitosamente");
      setProductoAgregado(false);
    }

  }, [productoAgregado]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/product?id="+params.id);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <main className="pt-[3%] px-[15%]">
      <div className="md:flex py-3 px-3 w-full">
          <div className="lg:flex mr-3 pb-[1%] pr-[5%]">
            <Image className="card-image flex-none bg-transparent" src={producto.image_url} alt={producto.name} width={400} height={10}/>
          </div>
          <div className="my-[1%] px-[1%] w-full flex flex-col rounded-lg shadow-md bg-white">
            
            <div className="text-5xl font-semibold tracking-tight text-gray-900">
              {producto.name}
            </div>
            
            <div className="text-2xl pt-3">
              {producto.description}
            </div>

            <div className="text-4xl mt-auto font-bold text-gray-900">
              {"$"+producto.price}
            </div>

            <div className="flex justify-center mt-auto pb-2 ">
              <AddToCartButton onButtonClick={agregarProductoCarrito}/>
            </div>
          </div>
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        closeOnClick
        autoClose={2000}
        pauseOnHover={false}
      />
    </main>
  );
}
