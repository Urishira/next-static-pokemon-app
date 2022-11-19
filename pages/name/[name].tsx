import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import React, { FC } from 'react'
import { Pokefull, PokemonApiTypes } from '../../types'
import { getPokemonsByParams } from '../../utils/getPokemonsByParams'
import { pokemonApi } from '../api'

type PokemonData = {
  pokemon: Pokefull
}
const PokemonByName: NextPage<PokemonData> = ({ pokemon }) => {
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

  const PokemonNames = data.results.map(path => path.name)
  const paths = PokemonNames.map(name => ({
    params: {
      name
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { name } = ctx.params as unknown as { name: string }
  const pokemon = await getPokemonsByParams(name)
  return {
    props: {
      pokemon
    }
  }
}

export default PokemonByName
