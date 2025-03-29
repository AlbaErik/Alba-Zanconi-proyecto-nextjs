import RegisterButton from "./components/register_button";

export default function Home() {
  return (
    <main className="">
      <div className="flex justify-center pt-5">
        <label className="text-4xl">
          Registrarse
        </label>
      </div>
      <div className="flex justify-center w-full">
        <div className="grid-cols-1 pt-5 w-1/4">
          <div className="">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese Nombre de usuario" required />
          </div>
          <div className="">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-3">Contraseña</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese Contraseña" required />
          </div>
          <div className="">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-3">E-Mail</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese E-Mail" required />
          </div>
          <div className="flex justify-center">
            <RegisterButton/>
          </div>
          
        </div>
        
        
      </div>
        
      
    </main>
  );
}
