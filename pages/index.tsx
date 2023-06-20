import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import { Layout } from '../common/layout'
import { pokemonApi } from './api'
import { PokemonApiTypes, SmallPokemon } from '../types'

import { CardPokemon } from '../common/ui/CardPokemon'

type PokemonPage = {
  pokemons: SmallPokemon[]
}
const Home: NextPage<PokemonPage> = ({ pokemons }) => {
  return (
    <Layout title="Pokemon-Home">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:grid-rows-1 gap-5">
        {pokemons.map(({ id, img, name }) => (
          <CardPokemon
            key={id}
            id={id}
            img={img}
            name={name}
            numberPoke={id as unknown as string}
          />
        ))}
      </div>
    </Layout>
  )
}

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
