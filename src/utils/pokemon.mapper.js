export const mapPokemon = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites.other['official-artwork'].front_default ??
      pokemon.sprites.front_default ??
      null,
    types: pokemon.types.map((type) => type.type.name),
    weight: pokemon.weight,
    height: pokemon.height
  }
}