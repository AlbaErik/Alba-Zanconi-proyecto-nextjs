import React from 'react';
import Link from 'next/link';

const UserRegisteredLoginButton: React.FC = () => {
  return (
    <Link href="/account/login" className="text-gray-600 hover:text-black hover:underline">Ingresar</Link>
  );
}

export default UserRegisteredLoginButton;