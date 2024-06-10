import Image from "next/image";

export default function Home() {
  var imageSrc="/headphones.webp";
  var title="Titulo";
  var description="Descripcion";
  var price="Precio"
  
  return (
    <main className="flex pt-[3%] pl-[10%] pr-[10%]">
      <div className="mx-auto lg:ml-[15%] lg:flex">
          <Image className="card-image flex-none" src={imageSrc} alt={title} width={400} height={10}/>
          <div className="pl-[15%] flex flex-col">
            <div className="text-5xl">
             {title}
            </div>
            
            <div className="text-2xl mt-[15%]">
              {description}
            </div>

            <div className="mt-auto text-4xl ">
              {price}
            </div>
          </div>
      </div>
    </main>
  );
}
