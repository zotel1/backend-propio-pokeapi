import { readFile } from 'node:fs/promises'

const POKEMON_FILE = new URL('../../data/pokemon.json', import.meta.url)

let pokemonCache = null

const loadPokemon = async () => {
  if (pokemonCache) {
    return pokemonCache
  }

  const fileContent = await readFile(POKEMON_FILE, 'utf-8')

  pokemonCache = JSON.parse(fileContent)

  return pokemonCache
}

export const getAllPokemon = async () => {
  return loadPokemon()
}

export const getPokemonById = async (id) => {
  const pokemon = await loadPokemon()

  return pokemon.find((item) => item.id === id) ?? null
}

export const getPokemonByName = async (name) => {
  const pokemon = await loadPokemon()

  const normalizedName = name.trim().toLowerCase()

  return (
    pokemon.find(
      (item) => item.name.toLowerCase() === normalizedName
    ) ?? null
  )
}

export const getPokemonByType = async (type) => {
  const pokemon = await loadPokemon()

  const normalizedType = type.trim().toLowerCase()

  return pokemon.filter((item) =>
    item.types.includes(normalizedType)
  )
}

export const getRandomPokemon = async () => {
  const pokemon = await loadPokemon()

  if (pokemon.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * pokemon.length)

  return pokemon[randomIndex]
}

export const getPokemonTypes = async () => {
  const pokemon = await loadPokemon()

  const types = new Set()

  pokemon.forEach((item) => {
    item.types.forEach((type) => {
      types.add(type)
    })
  })

  return [...types].sort()
}

export const clearPokemonCache = () => {
  pokemonCache = null
}