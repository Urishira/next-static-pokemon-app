import Head from 'next/head'
import { FC, ReactElement } from 'react'
import { NavbarPokemon } from '../ui/NavbarPokemon'

type LayoutType = {
  children: ReactElement | ReactElement[]
  title: string
}

const origin = typeof window !== 'undefined' ? window.location.origin : ''

export const Layout: FC<LayoutType> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'PokeApp'}</title>
        <meta property="og:title" content="Static generation Pokedex" />
        <meta property="og:description" content="Static generation Pokedex" />
        <meta property="og:image" content={`${origin}/image/pokemon2.jpg`} />
      </Head>
      <NavbarPokemon />
      <main className="bg-slate-600 p-6">{children}</main>
    </>
  )
}
