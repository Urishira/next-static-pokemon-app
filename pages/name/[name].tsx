import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '../../common/layout'
import { Pokefull, PokemonApiTypes } from '../../types'
import { setFavoritePokemon, isFavoriteIdPokemon } from '../../utils/favoritesPokemon'
import { useEffect, useState } from 'react'
import { getPokemonsByParams } from '../../utils/getPokemonsByParams'
import { pokemonApi } from '../api'

type PokemonProps = {
  pokemon: Pokefull
}

const PokemonName: NextPage<PokemonProps> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    setIsFavorite(isFavoriteIdPokemon(pokemon.id))
  }, [])
  const handleClick = () => {
    setFavoritePokemon(pokemon.id)
    setIsFavorite(!isFavorite)
  }
  return (
    <Layout title={pokemon.name || 'pokemon'}>
      <div className="grid grid-cols-2 gap-10">
        <div className="card  lg:card-side bg-white shadow-x">
          <figure>
            <Image
              width={500}
              height={500}
              layout="intrinsic"
              src={pokemon.sprites.other?.dream_world.front_default || 'no-image'}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-5xl">
              {pokemon.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quae accusamus vitae
              recusandae excepturi, soluta ullam laboriosam, maiores odit totam, natus beatae nisi
              fugiat inventore cumque nulla iste atque aut.
            </p>
            <div className="card-actions justify-end">
              <button onClick={handleClick} className="btn btn-secondary">
                {isFavorite ? 'Quit Favorite' : 'set Favorite'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 bg-white rounded-xl">
          <figure>
            <Image
              width={300}
              height={300}
              layout="intrinsic"
              src={pokemon.sprites.other?.home.front_default || ''}
              alt="Movie"
            />
          </figure>
          <figure>
            <Image
              width={300}
              height={300}
              layout="intrinsic"
              src={pokemon.sprites.other?.home.front_shiny || ''}
              alt="Movie"
            />
          </figure>
        </div>
      </div>
    </Layout>
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
    },
    revalidate: 86400
  }
}

export default PokemonName
