import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Layout } from '../../common/layout'
import { Ability, Sprites } from '../../types'
import { setFavoritePokemon, isFavoriteIdPokemon } from '../../utils/favoritesPokemon'
import { useEffect, useState } from 'react'
import { getPokemonByParams } from '../../utils/getPokemonsByParams'
import { Card3D } from '../../common/components'

type pokemonData = {
  id: number
  name: string
  sprites: Sprites
  abilities: Ability
}

type PokemonProps = {
  pokemon: pokemonData
}

const PokemonDetail: NextPage<PokemonProps> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(isFavoriteIdPokemon(pokemon?.id))
  }, [])

  const handleClick = () => {
    setFavoritePokemon(pokemon?.id)
    setIsFavorite(!isFavorite)
  }

  return (
    <Layout title={pokemon?.name || 'pokemon'}>
      <div
        className="w-screen h-screen flex justify-center items-center relative"
        style={{ perspective: 2000 }}
      >
        <Card3D pokemon={pokemon} handleClick={handleClick} />
      </div>
    </Layout>
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
  const { id } = ctx.params as { id: string }

  const [pokemon, abilities] = (await getPokemonByParams(id)).map(value => value.data)

  return {
    props: {
      pokemon,
      abilities
    }
  }
}

export default PokemonDetail
