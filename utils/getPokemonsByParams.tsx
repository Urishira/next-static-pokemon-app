import { pokemonApi } from '../pages/api'
import { Pokefull } from '../types'

export const getPokemonByParams = async (param: string) => {
  const { data: pokemon } = await pokemonApi.get<Pokefull>(`/pokemon/${param}/`)
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprites: pokemon.sprites
  }
}
