const express = require('express')
const router = express.Router()

const apiList = require('../controllers/animeListController')
const apiPages = require('../controllers/animePageController')
const animeUrl = require('../helpers/animeUrlHelper')






// anime list routes
router.get('/', (req,res) => {
  const anime = {
    title: 'Gogoanime List',
    base: 'anime/',
    entries: {
    	noparams: {
	      "ongoing-series": "ongoing-series",
	      "recently-added": "recently-added",
	      "season-list": "season-list",
    	},
    	param1: {
	      "recent-release": "recent-release/:page",
	      "new-season": "new-season/:page",
	      popular: "popular/:page",
    	},
    	params2: {
	      alphabet: "alphabet/:letter/:page",
	      movies: "movies/:page",    		
	      genre: "genre/:genre/:page",
    	},
    	params3: {
	      "seasons": "seasons/:subcategory/:page",
    	}
    }
  }


  console.log(anime)
  res.json(anime)
});





/* ################################################################### */
// no params

router.get('/ongoing-series', (req,res) => {
  const categoryValue = animeUrl.categoryValues().ongoingSeries

  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory: 'all',
    page: 1,
  }


  if(type === "pages") {
    apiPages.pages()
      .then(resOngoingSeries => {

        anime.list = resOngoingSeries
        res.status(200).json(anime)
      })
      .catch((error) => console.log("ongoing-series pages error"))
  }
  else {
    apiList.ongoingSeries()
      .then(resOngoingSeries => {

        anime.list = resOngoingSeries
        res.status(200).json(anime)
      })
      .catch((error) => console.log("ongoing-series list error"))
  }
});



router.get('/recently-added', (req,res) => {
  const categoryValue = animeUrl.categoryValues().recentlyAdded


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory: 'all',
    page: 1,
  }


  if(type === "pages") {
    apiPages.pages()
      .then(resRecentlyAdded => {
        
        anime.list = resRecentlyAdded
        res.status(200).json(anime)
      })
      .catch((error) => console.log("recently-added pages error"))
  }
  else {
    apiList.recentlyAddedSeries()
      .then(resRecentlyAdded => {

        anime.list = resRecentlyAdded
        res.status(200).json(anime)
      })
      .catch((error) => console.log("recently-added list error"))
  }

});



router.get('/season-list', (req,res) => {
  const categoryValue = animeUrl.categoryValues().seasonList


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory: 'all',
    page: 1,
  }


  if(type === "pages") {
    apiPages.pages()
      .then(resSeasonList => {
        
        anime.list = resSeasonList
        res.status(200).json(anime)
      })
      .catch((error) => console.log("season-list pages error"))
  }
  else {
    apiList.seasonList()
      .then(resSeasonList => {
        
        anime.list = resSeasonList
        res.status(200).json(anime)
      })
      .catch((error) => console.log("season-list list error"))
  }
});





/* ################################################################### */
// param 1

router.get('/new-season/:page', (req,res) =>{
  const page = parseInt(req.params.page, 10)
  const categoryValue = animeUrl.categoryValues().newSeason


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory: 'all',
    page,
  }


  if(type === "pages") {
    apiPages.pages(categoryValue.default,{ page })
      .then(resNewSeason => {

        anime.list = resNewSeason
        res.status(200).json(anime)
      })
      .catch((error) => console.log("new sesason pages error"))
  }
  else {
    apiList.newSeason(page)
      .then(resNewSeason => {

        anime.list = resNewSeason
        res.status(200).json(anime)
      })
      .catch((error) => console.log("new sesason list error"))
  }
});



router.get('/popular/:page', (req,res) => {
  const page = parseInt(req.params.page, 10)
  const categoryValue = animeUrl.categoryValues().popular


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory: 'all',
    page,
  }


  if(type === "pages") {
    apiPages.pages(categoryValue.default,{ page })
      .then(resPopular => {

        anime.list = resPopular
        res.status(200).json(anime)
      })
      .catch((error) => console.log("popular pages error"))
  }
  else {
    apiList.popular(page)
      .then(resPopular => {

        anime.list = resPopular
        res.status(200).json(anime)
      })
      .catch((error) => console.log("popular list error"))
  }
});



router.get('/recent-release/:page', (req,res) => {
  const page = parseInt(req.params.page , 10);
  const categoryValue = animeUrl.categoryValues().recentRelease


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory: 'all',
    page,
  }


  if(type === "pages") {
    apiPages.pages(categoryValue.default,{ page })
      .then(resRecentReleasedEpisodes => {

        anime.list = resRecentReleasedEpisodes
        res.status(200).json(anime)
      })
      .catch((error) => console.log("recently-added pages error"))
  }
  else {
    apiList.recentReleasedEpisodes(page)
      .then(resRecentReleasedEpisodes => {

        anime.list = resRecentReleasedEpisodes
        res.status(200).json(anime)
      })
      .catch((error) => console.log("recently-added list error"))
  }
});





/* ################################################################### */
// params 2

router.get('/anime-list/:subcategory/:page', (req,res) => {

  const subcategory = req.params.subcategory.toLowerCase()
  const page = parseInt(req.params.page, 10);
  const categoryValue = animeUrl.categoryValues().animeList


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory,
    page,
  }


  if(type === "pages") {
    apiPages.pages(categoryValue.default,{ subcategory,page })
      .then(resAnimeList => {

        anime.list = resAnimeList
        res.status(200).json(anime)
      })
      .catch((error) => console.log("anime-list pages error"))
  }
  else {
    apiList.animeList(subcategory,page)
      .then(resAnimeList => {

        anime.list = resAnimeList
        res.status(200).json(anime)
      })
      .catch((error) => console.log("anime-list list error"))
  }
});



router.get('/anime-movies/:subcategory/:page', (req,res) => {

  const subcategory = req.params.subcategory.toLowerCase()
  const page = parseInt(req.params.page, 10);
  const categoryValue = animeUrl.categoryValues().movies


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory,
    page,
  }


  if(type === "pages") {
    apiPages.pages(categoryValue.default,{ subcategory,page })
      .then(resMovies => {

        anime.list = resMovies
        res.status(200).json(anime)
      })
      .catch((error) => console.log("movie pages error"))
  }
  else {
    apiList.movies(subcategory,page)
      .then(resMovies => {

        anime.list = resMovies
        res.status(200).json(anime)
      })
      .catch((error) => console.log("movie list error"))
  }
});



router.get('/genre/:genre/:page', (req,res) => {
  const genre = req.params.genre.toLowerCase();
  const page = parseInt(req.params.page, 10);
  const categoryValue = animeUrl.categoryValues().genres


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory: genre,
    page,
  }


  if(type === "pages") {
    apiPages.pages(categoryValue.default,{ genre ,page })
      .then(resGenres => {

        anime.list = resGenres
        res.status(200).json(anime)
      })
      .catch((error) => console.log("genre pages error"))
  }
  else {
    apiList.genres(genre,page)
      .then(resGenres => {

        anime.list = resGenres
        res.status(200).json(anime)
      })
      .catch((error) => console.log("genre list error"))
  }
});





/* ################################################################### */
// params 3

router.get('/seasons/:subcategory/:page', (req,res) => {
  const subcategory = req.params.subcategory
  const page = req.params.page ? req.params.page : 1
  const categoryValue = animeUrl.categoryValues().seasons


  const type = req.query.type
  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    subcategory,
    page,
  }

  if(type === "pages") {
    apiPages.pages(categoryValue.default,{ subcategory,page })
      .then(resSeasons => {

        anime.list = resSeasons
        res.status(200).json(anime)
      })
      .catch((error) => console.log("season pages error"))
  }
  else {
  apiList.seasons(subcategory,page)
    .then(resSeasons => {

      anime.list = resSeasons
      res.status(200).json(anime)
    })
    .catch((error) => console.log("season list error"))
  }  
});





module.exports = router
