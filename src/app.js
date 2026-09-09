import express from 'express'
import cors from 'cors'

import healthRoutes from './routes/health.routes.js'
import pokemonRoutes from './routes/pokemon.routes.js'
import typeRoutes from './routes/type.routes.js'
import collectionRoutes from './routes/collection.routes.js'

import { notFound } from './middlewares/notFound.middleware.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_PRODUCTION_URL
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      const error = new Error('Origen no permitido por CORS')
      error.statusCode = 403

      callback(error)
    }
  })
)

app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/pokemon', pokemonRoutes)
app.use('/api/types', typeRoutes)
app.use('/api/collection', collectionRoutes)

app.use(notFound)
app.use(errorHandler)

export default app