import Link from 'next/link';
import React from 'react';

const NavigationBar: React.FC = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 rounded-lg">
        <div className="p-4">
            <div className="w-auto text-center">
                <ul className="font-medium flex flex-col p-2 m-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 border-0 md:bg-white dark:bg-gray-900">
                    <li>
                        <Link href="/user" className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link href={{pathname: `/user/Discos_Duros`,}} className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Discos Duros</Link>
                    </li>
                    <li>
                        <Link href={{pathname: `/user/Memorias_RAM`,}} className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Memorias RAM</Link>
                    </li>
                    <li>
                        <Link href={{pathname: `/user/Teclados`,}} className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Teclados</Link>
                    </li>
                    <li>
                        <Link href={{pathname: `/user/Fuentes_de_Poder`,}} className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Fuentes</Link>
                    </li>
                    <li>
                        <Link href={{pathname: `/user/Tarjetas_Gráficas`,}} className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Tarjetas</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}

export default NavigationBar;