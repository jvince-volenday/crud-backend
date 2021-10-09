const axios = require('axios')
const cloudscraper = require('cloudscraper')
const cheerio = require('cheerio')

const animeEnv = require('../animeEnv')
const animeUrl = require('../helpers/animeUrlHelper')






/* ################################################################### */
// no params

const ongoingSeries = async() => {
  const res = await axios.get(`${animeEnv.BASE_URL}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  // Array.from({length: 30}, (v,k) => {
    // $('div.main_body div.series nav.menu_series ul li').eq(k + 1).each((index,element) => {
    $('div.main_body div.series div#scrollbar2 nav.menu_series ul li').each((index,element) => {
      const $element = $(element)
      const id = $element.find('a').attr('href')
      const title = $element.find('a').text()

   
      promises.push({
        id: id ? id : null,
        title: title ? title : null,  
      })
    })
  // })
  return await Promise.all(promises)
};



const recentlyAddedSeries = async() => {
  const res = await axios.get(`${animeEnv.BASE_URL}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  $('div.main_body.none div.added_series_body ul.listing li').each((index , element) => {
    const $element = $(element)
    const id = $element.find('a').attr('href')
    const title = $element.find('a').text()


    promises.push({
      id: id ? id : null,
      title: title ? title : null,  
    })
  })
  return await Promise.all(promises)
};



const seasonList = async() => {
  const res = await axios.get(`${animeEnv.BASE_URL}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  // Array.from({length: 30}, (v,k) => {
    // $('div.main_body div.series nav.menu_series ul li').eq(k + 1).each((index,element) => {
    $('div.main_body div.series div.recent nav.menu_series ul li').each((index,element) => {
      const $element = $(element)
      const seasons = []
      const year = $element.find('span').text()


      $element.find('a').each((idx,linkEl) => {
        const $linkEl = $(linkEl)
  
        seasons.push({
          id: $linkEl.attr('href'),
          title: $linkEl.text()
        })
      })

   
      promises.push({
        year: year ? year : null,
        seasons: seasons.length > 0 ? seasons : null
      })
    })
  // })
  return await Promise.all(promises)
};





/* ################################################################### */
// param 1

const newSeason = async(page) => {

  const urlHelper = animeUrl.categoryUrls().newSeason.url
  const urlExt = urlHelper({ page })

  const res = await axios.get(`${animeEnv.BASE_URL}/${urlExt}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []


  
  $('div.main_body div.last_episodes ul.items li').each((index,element) => {
    const $element = $(element)
    const id = $element.find('div.img a').attr('href')
    const img = $element.find('div.img a img').attr('src')
    const title = $element.find('p.name a').attr('title')
    const released = $element.find('p.released').text().trim()


    promises.push({
      id: id ? id : null,
      img: img ? img : null,
      title: title ? title : null,
      released: released ? released : null,
    })
  })
  return await Promise.all(promises)
};



const popular = async(page) => {

  const urlHelper = animeUrl.categoryUrls().popular.url
  const urlExt = urlHelper({ page })

  const res = await axios.get(`${animeEnv.BASE_URL}/${urlExt}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []


  
  $('div.main_body div.last_episodes ul.items li').each((index,element) => {
    const $element = $(element)
    const id = $element.find('div.img a').attr('href')
    const img = $element.find('div.img a img').attr('src')
    const title = $element.find('p.name a').attr('title')
    const released = $element.find('p.released').text().trim()

   

    promises.push({
      id: id ? id : null,
      img: img ? img : null,
      title: title ? title : null,
      released: released ? released : null,
    })
  })
  return await Promise.all(promises)
};



const recentReleasedEpisodes = async(page) => {

  const urlHelper = animeUrl.categoryUrls().recentRelease.url
  const urlExt = urlHelper({ page })

  const res = await axios.get(`${animeEnv.BASE_URL}/${urlExt}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  $('div.main_body div.last_episodes.loaddub ul.items li').each((index,element) => {
    const $element = $(element)
    const id = $element.find('p.name a').attr('href')
    const img = $element.find('div.img a img').attr('src')
    const title = $element.find('p.name a').text()
    const episode = parseInt($element.find('p.episode').text().match(/\d+/g) , 10)


    promises.push({
      id: id ? `Episode${id}` : null,
      img: img ? img : null,
      title: title ? title : null,
      episode: `Episode ${episode}` || null,
    })
  })
  return await Promise.all(promises)
};





/* ################################################################### */
// params 2

const animeList = async(subcategory,page) => {

  const urlHelper = animeUrl.categoryUrls().animeList.url
  const urlExt = urlHelper({ subcategory, page })


  const res = await axios.get(`${animeEnv.BASE_URL}/${urlExt}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  $('div.main_body div.anime_list_body ul.listing li').each((index,element) => {
    const $element = $(element)
    const id = $element.find('a').attr('href')
    const title = $element.find('a').text()


    promises.push({
      id: id ? id : null,
      title: title ? title : null,
    })
  })
  return await Promise.all(promises)
};



const movies = async(subcategory,page) => {

  const urlHelper = animeUrl.categoryUrls().movies.url
  const urlExt = urlHelper({ subcategory, page })


  const res = await axios.get(`${animeEnv.BASE_URL}/${urlExt}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []


  
  $('div.main_body div.last_episodes ul.items li').each((index,element) =>{
    const $element = $(element)
    const id = $element.find('div.img a').attr('href')
    const img = $element.find('div.img a img').attr('src')
    const title = $element.find('p.name a').attr('title')
    const released = $element.find('p.released').text().trim()



    promises.push({
      id: id ? id : null,
      img: img ? img : null,
      title: title ? title : null,
      released: released ? released : null,
    })
  })
  return await Promise.all(promises)
};



const genres = async(genre,page) => {

  const urlHelper = animeUrl.categoryUrls().genres.url
  const urlExt = urlHelper({ genre, page })

  const res = await axios.get(`${animeEnv.BASE_URL}/${urlExt}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  $('div.main_body div.last_episodes ul.items li').each((index , element) =>{
    const $element = $(element)
    const id = $element.find('div.img a').attr('href')
    const img = $element.find('div.img a img').attr('src')
    const title = $element.find('p.name a').attr('title')
    const released = $element.find('p.released').text().trim()


    promises.push({
      id: id ? id : null,
      img: img ? img : null,
      title: title ? title : null,
      released: released ? released : null,
    })
  })
  return await Promise.all(promises)
};





/* ################################################################### */
// params 3
const seasons = async(subcategory,page) => {

  const urlHelper = animeUrl.categoryUrls().seasons.url
  const urlExt = urlHelper({ subcategory, page })


  const res = await axios.get(`${animeEnv.BASE_URL}/${urlExt}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  $('div.main_body div.last_episodes ul.items li').each((index,element) => {
    const $element = $(element)
    const id = $element.find('div.img a').attr('href')
    const img = $element.find('div.img a img').attr('src')
    const title = $element.find('p.name a').attr('title')
    const released = $element.find('p.released').text().trim()


    promises.push({
      id: id ? id : null,
      img: img ? img : null,
      title: title ? title : null,
      released: released ? released : null,
    })
  })
  return await Promise.all(promises)
};





module.exports = {
  ongoingSeries,
  recentlyAddedSeries,
  seasonList,

  newSeason,
  popular,
  recentReleasedEpisodes,

  animeList,
  movies,
  genres,

  seasons,
}