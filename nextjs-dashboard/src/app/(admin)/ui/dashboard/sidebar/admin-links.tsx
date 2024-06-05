'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard' },
  {
    name: 'Productos',
    href: '/dashboard/products',
  },
  { name: 'Clientes', href: '/dashboard/customers' },
];

export default function AdminLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-black hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': isActive,
              },
            )}
          >
            <p className="md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}