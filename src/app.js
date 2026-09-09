import express from 'express'
import cors from 'cors'
import typeRoutes from './routes/type.routes.js'
import collectionRoutes from './routes/collection.routes.js'

import healthRoutes from './routes/health.routes.js'
import pokemonRoutes from './routes/pokemon.routes.js'

import { notFound } from './middlewares/notFound.middleware.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/pokemon', pokemonRoutes)
app.use('/api/types', typeRoutes)
app.use('/api/collection', collectionRoutes)

app.use(notFound)
app.use(errorHandler)

export default app