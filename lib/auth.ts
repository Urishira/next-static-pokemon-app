import { FirestoreAdapter } from '@auth/firebase-adapter'
import { cert } from 'firebase-admin/app'
import { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
const origin = typeof window !== 'undefined' ? window.origin : ''
console.log(origin)
type TCredential = {
  email: string
  password: string
}

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),

    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize: async credentials => {
        const { email, password } = credentials as TCredential

        try {
          const resp = await fetch(`http://localhost:3000/api/signUp`, {
            headers: {
              'content-type': 'application/json',
              accept: 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email, password })
          })
          if (resp.ok) {
            const user = await resp.json()
            return Promise.resolve(user)
          }
        } catch (errors) {
          return errors
        }
      }
    })
  ],

  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
    })
  }) as Adapter,

  callbacks: {
    async signIn({ user }) {
      return true
    }
  }
}
