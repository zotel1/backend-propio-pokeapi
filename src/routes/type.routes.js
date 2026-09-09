import { Router } from 'express'

import { getPokemonTypes } from '../controllers/type.controller.js'

const router = Router()

router.get('/', getPokemonTypes)

export default router