import ProductCard from "./components/product_card"

export default function Home() {
  const cards = Array.from({ length: 20 });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-[3%] pl-[10%] pr-[10%]">
      <div className="grid grid-cols-5 gap-3">
      {cards.map((_, index) => (
        <ProductCard 
          key={index}
          title={`Producto ${index + 1}`} 
          price={`${index + 1}$`}
          imageSrc ="/headphones.webp"
        />
      ))}
    </div>
    </main>
  );
}
