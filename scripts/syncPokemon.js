import { mkdir, writeFile } from 'node:fs/promises'

import { mapPokemon } from '../src/utils/pokemon.mapper.js'

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'

const OUTPUT_DIRECTORY = new URL('../data/', import.meta.url)
const OUTPUT_FILE = new URL('../data/pokemon.json', import.meta.url)

const CONCURRENCY = 20
const MAX_RETRIES = 3

const fetchJson = async (url, retries = MAX_RETRIES) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `PokeAPI respondió ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    if (retries <= 1) {
      throw error
    }

    console.warn(
      `⚠️ Falló una petición. Reintentando... Intentos restantes: ${retries - 1}`
    )

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return fetchJson(url, retries - 1)
  }
}

const getPokemonList = async () => {
  console.log('🔎 Consultando cantidad de Pokémon...')

  const initialData = await fetchJson(
    `${POKEAPI_BASE_URL}/pokemon?limit=1&offset=0`
  )

  const totalPokemon = initialData.count

  console.log(`📦 Pokémon encontrados en PokeAPI: ${totalPokemon}`)

  const data = await fetchJson(
    `${POKEAPI_BASE_URL}/pokemon?limit=${totalPokemon}&offset=0`
  )

  return data.results
}

const getPokemonDetails = async (pokemonList) => {
  const pokemon = []

  for (let index = 0; index < pokemonList.length; index += CONCURRENCY) {
    const batch = pokemonList.slice(index, index + CONCURRENCY)

    const batchResults = await Promise.all(
      batch.map(async ({ url }) => {
        const pokemonData = await fetchJson(url)

        return mapPokemon(pokemonData)
      })
    )

    pokemon.push(...batchResults)

    const processed = Math.min(index + CONCURRENCY, pokemonList.length)

    console.log(
      `⚡ Procesados ${processed}/${pokemonList.length} Pokémon`
    )
  }

  return pokemon
}

const savePokemon = async (pokemon) => {
  await mkdir(OUTPUT_DIRECTORY, {
    recursive: true
  })

  await writeFile(
    OUTPUT_FILE,
    JSON.stringify(pokemon, null, 2),
    'utf-8'
  )
}

const syncPokemon = async () => {
  try {
    console.log('🚀 Iniciando sincronización con PokeAPI...')

    const pokemonList = await getPokemonList()

    const pokemon = await getPokemonDetails(pokemonList)

    pokemon.sort((a, b) => a.id - b.id)

    await savePokemon(pokemon)

    console.log('')
    console.log('✅ Sincronización completada')
    console.log(`📄 Pokémon guardados: ${pokemon.length}`)
    console.log('📁 Archivo: data/pokemon.json')
  } catch (error) {
    console.error('')
    console.error('❌ Error durante la sincronización')
    console.error(error.message)

    process.exit(1)
  }
}

syncPokemon()