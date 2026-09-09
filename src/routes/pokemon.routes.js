import { Router } from 'express'

import {
  getPokemon,
  getPokemonById,
  getRandomPokemon
} from '../controllers/pokemon.controller.js'

const router = Router()

router.get('/random', getRandomPokemon)

router.get('/', getPokemon)

router.get('/:id', getPokemonById)

export default router