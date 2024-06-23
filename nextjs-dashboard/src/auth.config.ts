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
      let userEmail= "";
      const isOnDashboard = NextRequest.nextUrl.pathname.startsWith('/admin/dashboard');
      const isOnUser = NextRequest.nextUrl.pathname.startsWith('/user');

      if(isLoggedIn){
        if(auth?.user!=null){
          userEmail=""+auth?.user.email;
          userRole=await getUserRole(userEmail);
        }
       
        console.log("Logged: "+userRole);
      }else{
        console.log("Not logged");
      }

      if(isOnDashboard){
        if(isLoggedIn && userRole=="admin"){
          return true;
        }
        else{
          return false  // Redirect unauthenticated users to login page
        }
      }

      if(!isOnDashboard && isLoggedIn && userRole=="admin"){
        console.log("Redirect admin");
        return Response.redirect(new URL('/admin/dashboard', NextRequest.nextUrl));
      }

      if(isLoggedIn){
        if(userRole=="user"){
          if(!isOnUser){
            return Response.redirect(new URL('/user', NextRequest.nextUrl));
          }
        }
      }
    
      return true;

      
      

      if(isLoggedIn && userRole.localeCompare("user") && !isOnUser){
        return Response.redirect(new URL('/user', NextRequest.nextUrl));
      }
      else{
        return true;
      }
      
      
    },
  },
  
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
