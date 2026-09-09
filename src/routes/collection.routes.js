import { Router } from 'express'

import {
  getCollection,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection
} from '../controllers/collection.controller.js'

const router = Router()

router.get('/', getCollection)

router.get('/:id', getCollectionById)

router.post('/', createCollection)

router.patch('/:id', updateCollection)

router.delete('/:id', deleteCollection)

export default router