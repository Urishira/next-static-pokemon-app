const setFavoritePokemon = (id: number) => {
  let pokemons: Array<number> = JSON.parse(localStorage.getItem('favorites') || '[]')
  if (pokemons.includes(id)) {
    pokemons = pokemons.filter(favorite => favorite !== id)
  } else {
    pokemons.push(id)
  }
  localStorage.setItem('favorites', JSON.stringify(pokemons))
}

const isFavoriteIdPokemon = (id: number) => {
  if (typeof window === 'undefined') return false
  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')
  return favorites.includes(id)
}

export { setFavoritePokemon, isFavoriteIdPokemon }
