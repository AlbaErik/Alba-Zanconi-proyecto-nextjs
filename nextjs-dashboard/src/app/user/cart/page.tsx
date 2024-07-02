"use client";
import CartCard from "./components/cart_card";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { ProductoEnCarrito, useAppContext } from "@/app/context";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  
  const { state, setState } = useAppContext();
  const [productos,setProductos] = useState<ProductoEnCarrito[]>([]);
  const [modalOpen,setModalOpen] =useState<boolean>(false);
  const [indiceProductoAElimninar,setIndiceProductoAEliminar] = useState<number>(0);

  useEffect(() => {
    setProductos(state);
    initMercadoPago('APP_USR-cf082da5-a989-4d78-8c11-9b80f90da071', { locale: 'es-AR' });
  },[]);

  useEffect(() => {
    setProductos([...state]);
  }, [state]);

  const eliminarProductoCarrito = () => {
    let productos = [...state];
    productos[indiceProductoAElimninar].quantity=productos[indiceProductoAElimninar].quantity-1;
    productos.splice(indiceProductoAElimninar,1);
    setState(productos);
    setModalOpen(false);
  }

  const noEliminarProductoCarrito = () => {
    setModalOpen(false);
    close();
  }

  const onClose = () => {
    setModalOpen(false);
  }

  function comprar(){
    
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
        const link_mercadopago = await response.json();
        window.location.href=""+link_mercadopago;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if(productos.length>0){
      fetchData();
    }
    else{
      toast("Agrega algun producto antes de comprar");
    }
  }

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
            imageSrc = {productos[index].picture_url}
            cantidad={productos[index].quantity}
            setModalOpen={setModalOpen}
            setIndiceProductoAEliminar={setIndiceProductoAEliminar}
          />
          ))}
        </div>
        <div className="flex justify-center mb-[20%]">
          <button onClick={comprar}className="inline-block align-middle w-5/6 sm:w-4/6 md:w-1/2 lg:w-1/3 mt-5 text-center text-white hover:bg-blue-900 bg-blue-700 rounded-lg h-12">
            Comprar
          </button>
        </div>
        <Popup onClose={() => {onClose; close() }} open={modalOpen} modal nested className="" >
          {
            (close: () => void) => (
                <div className="" style={{ border: '3px  black rounded-lg' }}>
                    <div className="flex justify-center text-3xl font-bold">
                        ¿Confirmar Eliminacion?
                    </div>
                    <div className="flex justify-around">
                        <button className="text-3xl font-bold hover:text-red-600" onClick=
                            {() => { eliminarProductoCarrito; close(); }}>
                                Si
                        </button>
                        <button className="text-3xl font-bold hover:text-green-600" onClick=
                            {() => { noEliminarProductoCarrito; close(); }}>
                                No
                        </button>
                    </div>
                </div>
            )
          }
        </Popup>
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