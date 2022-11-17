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
    <div className="card glass">
      <figure>
        <Image width={200} height={200} layout="intrinsic" src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button onClick={handleClickPokemon} className="btn btn-">
            See More
          </button>
        </div>
      </div>
    </div>
  )
}
