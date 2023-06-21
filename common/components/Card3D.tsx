import React from 'react'
import Image from 'next/image'
import { useMotionValue, useTransform, motion } from 'framer-motion'
import { Ability, Sprites } from '../../types'

type pokemonData = {
  id: number
  name: string
  sprites: Sprites
  abilities: Ability
}

type PokemonProps = {
  pokemon: pokemonData
  handleClick: () => void
}
export const Card3D: React.FC<PokemonProps> = ({ pokemon, handleClick }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  return (
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
        <Image src={pokemon?.sprites.other?.home.front_default || ''} width={200} height={200} />
      </motion.div>

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
  )
}
