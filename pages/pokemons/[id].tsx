import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '../../common/layout'
import { Pokefull } from '../../types'
import { setFavoritePokemon, isFavoriteIdPokemon } from '../../utils/favoritesPokemon'
import { useEffect, useState } from 'react'
import { getPokemonsByParams } from '../../utils/getPokemonsByParams'

type PokemonProps = {
  pokemon: Pokefull
}

const PokemonDetail: NextPage<PokemonProps> = ({ pokemon }) => {
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
  const paths = [...Array(150)].map((value, index) => {
    return { params: { id: `${index + 1}` } }
  })

  return {
    paths,
<<<<<<< HEAD
    fallback: 'blocking'
=======
    fallback: false

>>>>>>> 9b53a6764f60172b9a99851c38a7e82fe3cb0bdf
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { id } = ctx.params as unknown as { id: string }

  const pokemon = await getPokemonsByParams(id)

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
<<<<<<< HEAD
      pokemon
    },
    revalidate: 60
=======
      pokemon,
      abilities
    }

  const { id } = ctx.params as unknown as { id: string }

  const pokemon = await getPokemonsByParams(id)

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
>>>>>>> 9b53a6764f60172b9a99851c38a7e82fe3cb0bdf
  }
}

export default PokemonDetail
