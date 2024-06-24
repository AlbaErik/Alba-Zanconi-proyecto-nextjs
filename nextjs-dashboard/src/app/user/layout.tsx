"use client";
import Image from "next/image";
import NavigationBar from "./components/navigation_bar"
import LoginButton from "./components/login_button"
import SearchBar from "./components/search_bar"
import CartButton from "./components/cart_button";
import { Suspense } from "react";
import SignOutButton from "./components/sign_out_button";
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="en">
      <body>
        <div className="mx-[3%] sm:mx-[6%] md:mx-[10%] lg:mx-[15%] xl:mx-[20%]">

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
                
                  <SignOutButton/>

                  
   
            </div>

            <div className="h-10">
              <CartButton/>
            </div>
          </div>

          <div className="mt-4 ">
            <NavigationBar/>
          </div>

        </div>
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
function getServerSession(authOptions: any) {
  throw new Error("Function not implemented.");
}

