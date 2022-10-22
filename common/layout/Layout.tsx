import Head from 'next/head'
import { FC, ReactElement } from 'react'

type LayoutType = {
    children: ReactElement | ReactElement[]
    title: string
}

export const Layout: FC<LayoutType> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'PokeApp'}</title>
                <meta name='author' content='Uris' />
                <meta name='description' content='info about pokemon' />
                <meta name='keywords' content='pokemon, pokedex' />
            </Head>

            <main>
                {children}
            </main>
        </>
    )
}

