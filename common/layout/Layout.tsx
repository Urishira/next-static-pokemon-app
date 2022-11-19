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
        <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
        <meta
          property="og:description"
          content="Get from SEO newbie to SEO pro in 8 simple steps."
        />
        <meta property="og:image" content={`${origin}/image/pokemon2.jpg`} />
      </Head>
      <NavbarPokemon />
      <main className="bg-black">{children}</main>
    </>
  )
}
