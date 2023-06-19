import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '../../common/layout'
import { pokemonApi } from '../api'
import { Pokefull } from '../../types'
import { setFavoritePokemon, isFavoriteIdPokemon } from '../../utils/favoritesPokemon'
import { useEffect, useState } from 'react'
import { getPokemonByParams } from '../../utils/getPokemonsByParams'
import { useMotionValue, useTransform, motion } from 'framer-motion'

type Pokemon = {
  id: number
  name: string
  sprites: Pick<Pokefull, 'sprites'>
}
type PokemonProps = { pokemon: Pokemon }

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
          className="flex w-96 h-[500px] bg-slate-900 rounded-lg "
        >
          <div className="absolute right-20 -left-56 -top-64">
            {' '}
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10.png"
              width={500}
              height={500}
              layout="fixed"
            />
          </div>

          <button className="">Set favorite</button>
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

  const pokemon = await getPokemonByParams(id)
  console.log(pokemon)
  return {
    props: {
      pokemons: pokemon
    }
  }
}

export default PokemonDetail
