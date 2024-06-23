import type { NextAuthConfig } from 'next-auth';
import { getUserRole } from './app/lib/data';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    async authorized({ request: NextRequest , auth }) {
      const isLoggedIn = !!auth?.user;
      let userRole = "";   
      const isOnDashboard = NextRequest.nextUrl.pathname.startsWith('/admin/dashboard');
      const isOnUser = NextRequest.nextUrl.pathname.startsWith('/user');

      if(isLoggedIn){
        console.log("Logged");
      }else{
        console.log("Not logged");
      }

      if(isOnDashboard){
        if(isLoggedIn && userRole.localeCompare("admin")){
          return true;
        }
        else{
          return false  // Redirect unauthenticated users to login page
        }
      }

      if(!isOnDashboard && isLoggedIn && userRole.localeCompare("admin")){
        return Response.redirect(new URL('/admin/dashboard', NextRequest.nextUrl));
      }

      if(isLoggedIn && userRole.localeCompare("user") && !isOnUser){
        return Response.redirect(new URL('/user', NextRequest.nextUrl));
      }
      else{
        return true;
      }
      /*
      if (isOnDashboard) {
        if (isLoggedIn && userRole==="admin") return true;
        return false; // Redirect unauthenticated users to login page
      }else if (isLoggedIn && userRole==="user") {
        console.log("Loged in");
        return Response.redirect(new URL('/user', NextRequest.nextUrl));
      }else{
        console.log("Not logged in");
      }
      return true;
      */
    },
  },
  
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
