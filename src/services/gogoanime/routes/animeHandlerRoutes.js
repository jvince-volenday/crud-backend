const express = require('express')
const router = express.Router()


const apiHandler = require('../controllers/animeHandlerController')
const apiPages = require('../controllers/animePageController')
const animeUrl = require('../helpers/animeUrlHelper')
const { 
  // animeContentHandler, 
  animeEpisodeHandler, 
  decodeVidstreamingIframeURL 
} = require('../controllers/animeHandler')






// anime handlers routes
router.get('/', (req,res) => {
  const anime = {
    title: 'Gogoanime Handlers',
    base: 'anime/handlers/',
    entries: {
      search: {
        search: "search/?keyword",
        content: "content/:id",
        "episode-list": "episode-list/:id",
      },
      servers: {
        "episodes": "episodes/:id",
        "iframe-url": "iframe-url/*"
      }
    }
  }


  console.log(anime)
  res.json(anime)
});





/* ################################################################### */
// search

router.get('/search/', (req,res) => {
  const type = req.query.type
  const keyword = req.query.keyword
  const page = req.query.page ? req.query.page : 1
  const categoryValue = animeUrl.categoryValues().search
  console.log('page',page)


  const anime = {
    type: type === "pages" ? type : "list",
    category: categoryValue.camelCase,
    keyword: keyword.length > 3 ? keyword : null,
    page
  }


  if(type === "pages") {
    apiPages.pages(categoryValue.default,{ keyword,page })
      .then(resSearch => {

        anime.list = resSearch
        res.status(200).json(anime)
      })
      .catch((error) => console.log("search pages error"))
  }
  else {
    apiHandler.search(keyword,page)
      .then(resSearch => {

        anime.list = resSearch
        res.status(200).json(anime)
      })
      .catch((error) => console.log("search list error"))
  }
});



// content
router.get('/content/:id', (req,res) => {
  const id = req.params.id.toLowerCase()
  const categoryValue = animeUrl.categoryValues().content

  const anime = {
    type: 'list',
    category: categoryValue.camelCase,
    subcategory: id,
    page: 1
  }


  apiHandler.animeContent(id)
    .then(resInfo => {

      anime.list = resInfo
      res.status(200).json(anime)
    })
    .catch((error) => console.log("anime content error"))
});



// episode list
router.get('/episode-list/:id', (req,res) => {
  const id = req.params.id.toLowerCase()
  const categoryValue = animeUrl.categoryValues().episodeList

  const anime = {
    type: 'list',
    category: categoryValue.camelCase,
    subcategory: id,
    page: 1
  }

  apiHandler.episodeList(id)
    .then(resInfo => {

      anime.list = resInfo
      res.status(200).json(anime)
    })
    .catch((error) => console.log("episode list error"))
});





/* ################################################################### */
// links/servers

router.get('/episodes/:id', (req,res) => {
  const id = req.params.id.toLowerCase()
  const categoryValue = animeUrl.categoryValues().episodes


  const anime = {
    type: 'list',
    category: categoryValue.camelCase,
    subcategory: id,
    page: 1
  }


  animeEpisodeHandler(id)
    .then(resEpisode => {

      anime.list = resEpisode
      res.status(200).json(anime)
    })
    .catch((error) => {
      res.status(404).json("Episode Not Found")
    })
});



router.get('/iframe-url/*', (req,res) => {
  const url = req.originalUrl
  const _url = url.replace("/anime/iframe-url/", "")


  decodeVidstreamingIframeURL(_url)
    .then(resIframe => { 
      const anime = {
        url: _url,
        list: resIframe
      }

    	res.status(200).json(anime)
    })
    .catch((error) => console.log("error"))
});





module.exports = router
