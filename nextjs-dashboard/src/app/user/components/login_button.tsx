import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';

interface SessionProps{
  session: Session | null
}

const LoginButton: React.FC<SessionProps> =  ({ session }) => {

  if (session == null){
    return (
      <Link href="/" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm     px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 h-full">
          Sign In
      </Link>
    );
  }
    
  
}

export default LoginButton;