import React from 'react';
import Link from 'next/link';

const UserUnregisteredLoginButton: React.FC = () => {
  return (
    <Link href="/user" className="text-center text-gray-600 hover:text-black hover:underline">Acceder sin cuenta</Link>
  );
}

export default UserUnregisteredLoginButton;