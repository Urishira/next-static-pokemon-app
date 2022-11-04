import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import { Button } from '@nextui-org/react'
import { Layout } from '../common/layout'
import { pokemonApi } from './api'
import { PokemonApiTypes, SmallPokemon } from '../types'

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

export const getStaticProps: GetStaticProps = async ctx => {
  const { data } = await pokemonApi.get<PokemonApiTypes>('/pokemon?limit=150')
  const pokemons: SmallPokemon[] = data.results.map((pokeInfo, i) => {
    const idPoke = i + 1
    return {
      ...pokeInfo,
      id: idPoke,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPoke}.svg`
    }
  })

  return {
    props: {
      pokemons
    }
  }
}
export default Home
