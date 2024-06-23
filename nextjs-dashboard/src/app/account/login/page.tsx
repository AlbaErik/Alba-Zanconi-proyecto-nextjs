import { useActionState } from "react";
import LoginButton from "./components/login_button";
import RegisterButton from "./components/register_button";
import { authenticate } from "@/app/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <main className="">
      <form action={formAction} className="space-y-3">
        <div className="flex justify-center pt-5">
          <label className="text-4xl">
            Iniciar Sesion
          </label>
        </div>
        <div className="flex justify-center w-full">
          <div className="grid-cols-1 pt-5 w-1/4">
            <div className="">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                id="email"
                type="email"
                name="email"
                placeholder="Ingrese su Email" 
                required />
            </div>
            <div className="">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-3">Contraseña</label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Ingrese su Contraseña" 
                id="password"
                type="password"
                name="password"
                required />
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
            <div className="flex justify-center">
              <LoginButton/>
            </div>
            <div className="flex justify-center pt-5">
              <RegisterButton/>
            </div>
            
          </div>
          
          
        </div>
        
      </form>
    </main>
  );
}
