import { AxiosResponse } from 'axios'
import { pokemonApi } from '../pages/api'
import { Pokefull } from '../types'
import { Ability } from '../types/pokemon-full'

export const getPokemonByParams = async (
  param: string
): Promise<[AxiosResponse<Pokefull>, AxiosResponse<Ability>]> => {
  const dataPokemon = pokemonApi.get<Pokefull>(`/pokemon/${param}/`)
  const datAbility = pokemonApi.get<Ability>(`/ability/${param}/`)
  const value = await Promise.all([dataPokemon, datAbility])
  return value
}
