import { AppError } from '../errors/AppError.js'

import {
  getPokemonById
} from '../repositories/pokemon.repository.js'

import {
  getAllCollectionItems,
  getCollectionItemById,
  createCollectionItem,
  updateCollectionItem,
  deleteCollectionItem
} from '../repositories/collection.repository.js'

export const findAllCollectionItems = async () => {
  return getAllCollectionItems()
}

export const findCollectionItemById = async (id) => {
  const item = await getCollectionItemById(id)

  if (!item) {
    throw new AppError(
      'Elemento de la coleccion no encontrado',
      404
    )
  }

  return item
}

export const addCollectionItem = async ({
  pokemonId,
  nickname,
  notes
}) => {
  if (
    !Number.isInteger(pokemonId) ||
    pokemonId < 1
  ) {
    throw new AppError(
      'pokemonId debe ser un entero mayor a 0',
      400
    )
  }

  const pokemon = await getPokemonById(pokemonId)

  if (!pokemon) {
    throw new AppError(
      'El Pokemon indicado no existe',
      404
    )
  }

  const normalizedNickname =
    typeof nickname === 'string'
      ? nickname.trim()
      : ''

  const normalizedNotes =
    typeof notes === 'string'
      ? notes.trim()
      : ''

  return createCollectionItem({
    pokemonId: pokemon.id,
    name: pokemon.name,
    nickname: normalizedNickname,
    notes: normalizedNotes
  })
}

export const editCollectionItem = async (
  id,
  { nickname, notes }
) => {
  const existingItem =
    await getCollectionItemById(id)

  if (!existingItem) {
    throw new AppError(
      'Elemento de la coleccion no encontrado',
      404
    )
  }

  const changes = {}

  if (nickname !== undefined) {
    if (typeof nickname !== 'string') {
      throw new AppError(
        'nickname debe ser texto',
        400
      )
    }

    changes.nickname = nickname.trim()
  }

  if (notes !== undefined) {
    if (typeof notes !== 'string') {
      throw new AppError(
        'notes debe ser texto',
        400
      )
    }

    changes.notes = notes.trim()
  }

  if (Object.keys(changes).length === 0) {
    throw new AppError(
      'Debe enviar al menos nickname o notes',
      400
    )
  }

  return updateCollectionItem(id, changes)
}

export const removeCollectionItem = async (id) => {
  const deletedItem =
    await deleteCollectionItem(id)

  if (!deletedItem) {
    throw new AppError(
      'Elemento de la coleccion no encontrado',
      404
    )
  }

  return deletedItem
}