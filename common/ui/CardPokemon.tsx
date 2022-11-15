import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

type CartPokemonProps = {
  id: number
  img: string
  name: string
  numberPoke: string
}
export const CardPokemon: FC<CartPokemonProps> = ({ id, img, name, numberPoke }) => {
  const route = useRouter()
  const handleClickPokemon = () => {
    route.push(`pokemons/${id}`)
  }
  return (
    <div className="flex w-96 p-5 bg-white text-black">
      <figure>
        <Image width={200} height={200} layout="intrinsic" src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-4xl">
          {name}#{numberPoke}
        </h2>
        <p>{name}</p>
      </div>
    </div>
  )
}
