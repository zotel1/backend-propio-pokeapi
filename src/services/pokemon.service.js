import { AppError } from '../errors/AppError.js'

import {
  getAllPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonByType,
  getRandomPokemon,
  getPokemonTypes
} from '../repositories/pokemon.repository.js'

const ALLOWED_TYPES = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dark',
  'dragon',
  'steel',
  'fairy'
]

export const findPokemon = async ({
  name,
  type,
  limit,
  offset
}) => {
  if (name && type) {
    throw new AppError(
      'No se puede buscar por nombre y tipo al mismo tiempo',
      400
    )
  }

  if (name) {
    const pokemon = await getPokemonByName(name)

    if (!pokemon) {
      throw new AppError('Pokemon no encontrado', 404)
    }

    return pokemon
  }

  if (type) {
    const normalizedType = type.trim().toLowerCase()

    if (!ALLOWED_TYPES.includes(normalizedType)) {
      throw new AppError('Tipo de Pokemon invalido', 400)
    }

    const pokemon = await getPokemonByType(normalizedType)

    return paginatePokemon(pokemon, limit, offset)
  }

  const pokemon = await getAllPokemon()

  return paginatePokemon(pokemon, limit, offset)
}

export const findPokemonById = async (id) => {
  const pokemon = await getPokemonById(id)

  if (!pokemon) {
    throw new AppError('Pokemon no encontrado', 404)
  }

  return pokemon
}

export const findRandomPokemon = async () => {
  const pokemon = await getRandomPokemon()

  if (!pokemon) {
    throw new AppError(
      'No hay Pokemon disponibles',
      404
    )
  }

  return pokemon
}

export const findPokemonTypes = async () => {
  const types = await getPokemonTypes()

  return types.filter((type) =>
    ALLOWED_TYPES.includes(type)
  )
}

const paginatePokemon = (pokemon, limit, offset) => {
  const parsedLimit = Number(limit ?? 20)
  const parsedOffset = Number(offset ?? 0)

  if (
    !Number.isInteger(parsedLimit) ||
    parsedLimit < 1 ||
    parsedLimit > 50
  ) {
    throw new AppError(
      'El parametro limit debe ser un entero entre 1 y 50',
      400
    )
  }

  if (
    !Number.isInteger(parsedOffset) ||
    parsedOffset < 0
  ) {
    throw new AppError(
      'El parametro offset debe ser un entero mayor o igual a 0',
      400
    )
  }

  const results = pokemon.slice(
    parsedOffset,
    parsedOffset + parsedLimit
  )

  return {
    results,
    pagination: {
      total: pokemon.length,
      limit: parsedLimit,
      offset: parsedOffset,
      count: results.length
    }
  }
}