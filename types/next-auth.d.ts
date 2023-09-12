import { UserCredential } from 'firebase/auth'
import NextAuth, { CredentialProvider } from 'next-auth'

declare module 'next-auth' {
  interface User {}

  interface Session {
    // Propiedades de la sesión
  }

  interface AppCredentials {
    // Propiedades de las credenciales de la aplicación
  }

  interface UserCredentialsConfig<T extends Record<string, string>> {
    authorize: (
      credentials: T | undefined,
      req: RequestInternal
    ) => Promise<User | null> | User | null
  }
}
