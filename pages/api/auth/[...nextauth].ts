import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from '@/libs/prismadb'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'


export const authOptions : AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text"},
        password: {  label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials.password){
          throw new Error('Gecersiz mail ya da parola...')
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user || !user.hashedPassword){
          throw new Error('Gecersiz mail ya da parola...')
        }

        const comparePassword = await bcrypt.compare(credentials.password, user.hashedPassword)

        if(!comparePassword){
          throw new Error('Yanlıs parola...')
        }

        return user

      }
    })
    
  ],
  pages : {
    signIn: "/login"
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt"
  },
  secret:process.env.NEXTAUTH_SECRET
}


export default NextAuth(authOptions)