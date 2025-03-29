import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getUser } from '@/app/lib/data';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
      async authorize(credentials) {
        console.log("singout");
          const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(4) })
              .safeParse(credentials);

          if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              const user = await getUser(email);

              if (!user){
                console.log("Usuario no encontrado");
                return null;
              } 
              const passwordsMatch = await bcrypt.compare(password, user.password);
              if (passwordsMatch) return user;
          }
          console.log('Credenciales invalidas');

          return null;
      },
  }),],
});