import { findPokemonTypes } from '../services/pokemon.service.js'

export const getPokemonTypes = async (req, res) => {
  const types = await findPokemonTypes()

  res.status(200).json(types)
}