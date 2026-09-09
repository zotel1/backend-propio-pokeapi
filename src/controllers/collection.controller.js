import { AppError } from '../errors/AppError.js'

import {
  findAllCollectionItems,
  findCollectionItemById,
  addCollectionItem,
  editCollectionItem,
  removeCollectionItem
} from '../services/collection.service.js'

const parseCollectionId = (value) => {
  const id = Number(value)

  if (!Number.isInteger(id) || id < 1) {
    throw new AppError(
      'El id debe ser un entero mayor a 0',
      400
    )
  }

  return id
}

export const getCollection = async (req, res) => {
  const collection = await findAllCollectionItems()

  res.status(200).json(collection)
}

export const getCollectionById = async (req, res) => {
  const id = parseCollectionId(req.params.id)

  const item = await findCollectionItemById(id)

  res.status(200).json(item)
}

export const createCollection = async (req, res) => {
  const { pokemonId, nickname, notes } = req.body

  const item = await addCollectionItem({
    pokemonId,
    nickname,
    notes
  })

  res.status(201).json(item)
}

export const updateCollection = async (req, res) => {
  const id = parseCollectionId(req.params.id)

  const { nickname, notes } = req.body

  const item = await editCollectionItem(id, {
    nickname,
    notes
  })

  res.status(200).json(item)
}

export const deleteCollection = async (req, res) => {
  const id = parseCollectionId(req.params.id)

  const item = await removeCollectionItem(id)

  res.status(200).json(item)
}