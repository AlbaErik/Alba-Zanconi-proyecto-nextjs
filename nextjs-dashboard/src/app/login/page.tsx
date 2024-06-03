import Image from "next/image";
import LoginButton from "./components/login_button";
import RegisterButton from "./components/register_button";

export default function Home() {
  return (
    <main className="">
      <div className="flex justify-center">
        <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo.png"
                alt="Logo"
                width={300}
                height={50}
                priority
          />
      </div>

      
      <div className="flex justify-center pt-5">
        <label className="text-4xl">
          Iniciar Sesion
        </label>
      </div>
      <div className="flex justify-center w-full">
        <div className="grid-cols-1 pt-5 w-1/4">
          <div className="">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre de usuario" required />
          </div>
          <div className="">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-3">Contraseña</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contraseña" required />
          </div>
          <div className="flex justify-center">
            <LoginButton/>
          </div>
          <div className="flex justify-center pt-5">
            <RegisterButton/>
          </div>
          
        </div>
        
        
      </div>
        
      
    </main>
  );
}
