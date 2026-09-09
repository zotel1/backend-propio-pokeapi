import { readFile, writeFile } from 'node:fs/promises'

const COLLECTION_FILE = new URL(
  '../../data/collection.json',
  import.meta.url
)

const loadCollection = async () => {
  const fileContent = await readFile(
    COLLECTION_FILE,
    'utf-8'
  )

  return JSON.parse(fileContent)
}

const saveCollection = async (collection) => {
  await writeFile(
    COLLECTION_FILE,
    JSON.stringify(collection, null, 2),
    'utf-8'
  )
}

export const getAllCollectionItems = async () => {
  return loadCollection()
}

export const getCollectionItemById = async (id) => {
  const collection = await loadCollection()

  return (
    collection.find((item) => item.id === id) ?? null
  )
}

export const createCollectionItem = async (item) => {
  const collection = await loadCollection()

  const nextId =
    collection.length === 0
      ? 1
      : Math.max(...collection.map((item) => item.id)) + 1

  const newItem = {
    id: nextId,
    ...item
  }

  collection.push(newItem)

  await saveCollection(collection)

  return newItem
}

export const updateCollectionItem = async (
  id,
  changes
) => {
  const collection = await loadCollection()

  const index = collection.findIndex(
    (item) => item.id === id
  )

  if (index === -1) {
    return null
  }

  const updatedItem = {
    ...collection[index],
    ...changes,
    id
  }

  collection[index] = updatedItem

  await saveCollection(collection)

  return updatedItem
}

export const deleteCollectionItem = async (id) => {
  const collection = await loadCollection()

  const index = collection.findIndex(
    (item) => item.id === id
  )

  if (index === -1) {
    return null
  }

  const [deletedItem] = collection.splice(index, 1)

  await saveCollection(collection)

  return deletedItem
}