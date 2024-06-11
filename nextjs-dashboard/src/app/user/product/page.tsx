import Image from "next/image";
import AddToCartButton from "./components/add_cart_button";

export default function Home() {
  var imageSrc="/headphones.webp";
  var title="Titulo";
  var description="Descripcion";
  var price="Precio"
  
  return (
    <main className="pt-[3%] px-[15%]">
      <div className="md:flex py-3 px-3 border-black border-4 rounded-lg w-full">
          <div className="lg:flex mr-3 pb-[1%]">
            <Image className="card-image flex-none" src={imageSrc} alt={title} width={400} height={10}/>
          </div>
          <div className="my-[1%] px-[1%] w-full flex flex-col rounded-lg shadow-md bg-white">
            
            <div className="text-5xl">
              {title}
            </div>
            
            <div className="text-2xl">
              {description}
            </div>
            <div className="text-4xl">
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
