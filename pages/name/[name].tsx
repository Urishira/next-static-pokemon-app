import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { FC } from 'react'
import { Pokefull, PokemonApiTypes } from '../../types'
import { getPokemonByParams } from '../../utils/getPokemonsByParams'
import { pokemonApi } from '../api'

type PokemonData = {
  pokemon: Pokefull
}
const PokemonByName: FC<PokemonData> = ({ pokemon }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-rows-1 border border-black w-72 h-48">
        <Image src={pokemon.sprites.front_default} layout="responsive" width={200} height={200} />
        <div className="flex flex-col">
          <h2 className="text-4xl">{pokemon.name}</h2>
          <p>{pokemon.order}</p>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async ctx => {
  const { data } = await pokemonApi.get<PokemonApiTypes>('/pokemon?limit=150')
  const paths = data.results.map(pokemons => ({ params: { name: pokemons.name } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { name } = ctx.params as unknown as { name: string }
  const pokemon = getPokemonByParams(name)
  return {
    props: {
      pokemon
    }
  }
}

export default PokemonByName
