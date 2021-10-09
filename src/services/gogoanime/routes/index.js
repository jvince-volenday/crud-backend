const express = require('express');
const router = express.Router()
const animeListRoutes = require('./animeListRoutes')
const animePageRoutes = require('./animePageRoutes')
const animeHandlerRoutes = require('./animeHandlerRoutes')





router.use('/anime', animeListRoutes)
router.use('/anime/pages', animePageRoutes)
router.use('/anime/handlers', animeHandlerRoutes)
module.exports = router