import Image from "next/image";
import NavigationBar from "./components/navigation_bar"
import LoginButton from "./components/login_button"
import SearchBar from "./components/search_bar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-[3%] sm:mx-[6%] md:mx-[10%] lg:mx-[15%] xl:mx-[20%] 2xl:[25%]">

          <div className= "mt-10 flex items-center">
            <div className="mr-4">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo.png"
                alt="Logo"
                width={120}
                height={20}
                priority
              />
            </div>

            <SearchBar/>

            <div className="mx-4">
              <LoginButton/>
            </div>

            <div>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/shopping-cart-icon.webp"
                alt="Imagen carrito"
                width={60}
                height={20}
                priority
              />
            </div>
          </div>

          <div className="mt-4 ">
            <NavigationBar/>
          </div>

        </div>

        {children}

      </body>
    </html>
  );
}
