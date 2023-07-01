import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'
function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps<SessionProviderProps>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
export default MyApp
