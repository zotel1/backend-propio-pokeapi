export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500

  const message =
    statusCode === 500
      ? 'Error interno del servidor'
      : error.message

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode
    }
  })
}