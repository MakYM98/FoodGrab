// Import dependencies
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// Set default port for express app
const PORT = process.env.PORT || 4001

// Create express app
const app = express()

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Import routes
const databaseRouter = require('./routes/route')

// Implement Asset Info route
app.use('/foodgrab', databaseRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})