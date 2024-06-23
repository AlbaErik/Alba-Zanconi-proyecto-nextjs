"use client";
import Image from "next/image";
import AddToCartButton from "./components/add_cart_button";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { ProductoEnCarrito, useAppContext } from "@/app/context";
import { ProductWithCategory } from "@/app/lib/data";

export default function Home() {
  const params = useParams();
  const [name,setName] = useState<string>("");
  const [description,setDescription] = useState<string>("");
  const [price,setPrice] = useState<string>("");
  const [producto,setProducto] = useState<ProductWithCategory>({
    id: "",
    name: "",
    description: "",
    price: 0,
    image_url: "",
    category_name: "",
  });

  const agregarProductoCarrito = () => {
    setExecuteEffect(true);
  };

  const { state, setState } = useAppContext();
  const [executeEffect, setExecuteEffect] = useState(false);

  function buscarProductoEnCarrito(): number{
    let indice = 0;
    let i = 0;
    while(indice === 0 && i<state.length){
      if(state[i].id===producto.id){
        indice = i;
      }
      else{
        i++
      }
    }
    return indice;
  }

  useEffect(() => {
    const agregarProducto = async () => {
      if(executeEffect){
        let productos: ProductoEnCarrito[] = [...state];
        let indice = buscarProductoEnCarrito();
        
        //Se ejecuta cuando el indice es distinto de 0 (El producto estaba en el carrito)
        if(indice){
          productos[indice].quantity=productos[indice].quantity+1;
        }
        else{
          let newProducto: ProductoEnCarrito  = {
            id: producto.id,
            title: producto.name,
            description: producto.description,
            unit_price: +producto.price,
            picture_url: producto.image_url,
            category_id: producto.category_name,
            quantity: 1
          }
          productos.push(newProducto);
        }
        setState(productos);
        setExecuteEffect(false);
      }
    }
    agregarProducto();
  }, [executeEffect]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/product?id="+params.id);
        const data = await response.json();
        setProducto(data);
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
      <div className="md:flex py-3 px-3 w-full">
          <div className="lg:flex mr-3 pb-[1%] pr-[5%]">
            <Image className="card-image flex-none" src={imageSrc} alt={name} width={400} height={10}/>
          </div>
          <div className="my-[1%] px-[1%] w-full flex flex-col rounded-lg shadow-md bg-white">
            
            <div className="text-5xl font-semibold tracking-tight text-gray-900">
              {name}
            </div>
            
            <div className="text-2xl pt-3">
              {description}
            </div>
            <div className="text-4xl mt-auto font-bold text-gray-900">
              {price}
            </div>

            <div className="flex justify-center mt-auto pb-2 ">
              <AddToCartButton onButtonClick={agregarProductoCarrito}/>
            </div>
          </div>
      </div>
    </main>
  );
}
