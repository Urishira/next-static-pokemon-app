import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '../../common/layout'
import { Ability, Sprites } from '../../types'
import { setFavoritePokemon, isFavoriteIdPokemon } from '../../utils/favoritesPokemon'
import { useEffect, useState } from 'react'
import { getPokemonByParams } from '../../utils/getPokemonsByParams'
import { useMotionValue, useTransform, motion } from 'framer-motion'
import HeartSvg from '../../common/svgs/heartSVG'

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

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

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
        <motion.div
          style={{ x, y, rotateX, rotateY, z: 100 }}
          drag
          dragElastic={0.18}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          whileTap={{ cursor: 'grabbing' }}
          className="card flex justify-between w-96 h-[500px] p-4 bg-slate-900 text-slate-100 rounded-lg "
        >
          <motion.div
            style={{ x, y, rotateX, rotateY, z: 10000 }}
            className="absolute -left-28 -top-28"
          >
            <Image
              src={pokemon?.sprites.other?.home.front_default || ''}
              width={200}
              height={200}
            />
          </motion.div>

          <HeartSvg fill="#fff" className="w-6 -top-72 bottom-0 right-7 absolute" />
          <figure>
            <img
              src={pokemon?.sprites.other?.dream_world.front_default || ''}
              width={200}
              height={200}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{pokemon.name}</h2>
            <p>{pokemon.abilities.ability?.name}</p>
            <button className="btn btn-primary" onClick={handleClick}>
              Set favorite{' '}
            </button>
          </div>
        </motion.div>
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
