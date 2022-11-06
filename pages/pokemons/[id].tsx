import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { pokemonApi } from '../api'
import { Pokefull } from '../../types'

type PokemonProps = {
  pokemon: Pokefull
}
const PokemonDetail: NextPage<PokemonProps> = ({ pokemon }) => {
  console.log(pokemon)
  return (
    <div>
      <h1>{pokemon.name}</h1>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async ctx => {
  const paths = [...Array(150)].map((value, index) => {
    return { params: { id: `${index + 1}` } }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const id = ctx.params?.id as unknown as { id: string }
  const { data: pokemon } = await pokemonApi.get<Pokefull>(`/pokemon/${id}/`)
  console.log(pokemon)
  return {
    props: {
      pokemon
    }
  }
}

export default PokemonDetail
