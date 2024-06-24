import Link from 'next/link';
import React from 'react';

const LoginButton: React.FC = () => {
  return (
    <Link href="/" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm     px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 h-full">
        Sign In
    </Link>
  );
}

export default LoginButton;