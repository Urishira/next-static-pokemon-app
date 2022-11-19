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
    <div className="grid grid-cols-2 border-solid border-black ">
      <figure>
        <Image width={200} height={200} layout="intrinsic" src={img} alt={name} />
      </figure>
      <div className="justify-end">
        <h2 className="card-title">
          #{id} {name}
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button onClick={handleClickPokemon} className="btn btn-warning">
            See More
          </button>
        </div>
      </div>
    </div>
  )
}
