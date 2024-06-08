import React from 'react';
import Link from 'next/link';

const RegisterButton: React.FC = () => {
  return (
    <Link href="/register" className="text-gray-600 hover:text-black hover:underline">No tienes cuenta? Registrate</Link>
  );
}

export default RegisterButton;