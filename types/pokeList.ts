export type SmallPokemon = {
  name: string
  url: string
  id: number
  img: string
}

export type PokemonApiTypes = {
  count: number
  next: string
  previous: string
  results: SmallPokemon[]
}
