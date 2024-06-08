import React from 'react';
import Link from 'next/link';

const AdminLoginButton: React.FC = () => {
  return (
    <Link href="/accounnt/login" className="text-gray-600 hover:text-black hover:underline">Ingresar</Link>
  );
}

export default AdminLoginButton;