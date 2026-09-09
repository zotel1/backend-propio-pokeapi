import { AppError } from '../errors/AppError.js'

import {
  findPokemon,
  findPokemonById,
  findRandomPokemon
} from '../services/pokemon.service.js'

export const getPokemon = async (req, res) => {
  const { name, type, limit, offset } = req.query

  const result = await findPokemon({
    name,
    type,
    limit,
    offset
  })

  res.status(200).json(result)
}

export const getPokemonById = async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id < 1) {
    throw new AppError(
      'El id debe ser un entero mayor a 0',
      400
    )
  }

  const pokemon = await findPokemonById(id)

  res.status(200).json(pokemon)
}

export const getRandomPokemon = async (req, res) => {
  const pokemon = await findRandomPokemon()

  res.status(200).json(pokemon)
}