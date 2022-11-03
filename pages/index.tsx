import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import { Button } from '@nextui-org/react'
import { Layout } from '../common/layout'
import { pokemonApi } from './api'

const Home: NextPage = () => {
  return (
    <Layout title="Pokemon-Home">
      <Button color="gradient">Hello world</Button>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export type Result = {
  name: string
  url: string
}

export type PokemonApiTypes = {
  count: number
  next: string
  previous: any
  results: Result[]
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { data } = await pokemonApi.get<PokemonApiTypes>('/pokemon?limit=150')
  return {
    props: {
      pokemons: data.results
    }
  }
}

export default Home
