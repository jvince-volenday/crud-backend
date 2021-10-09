const axios = require('axios')
const cloudscraper = require('cloudscraper')
const cheerio = require('cheerio')


const animeEnv = require('../animeEnv')
const { 
	animeContentHandler,
  animeEpisodeListHandler,
	// animeEpisodeHandler,
	decodeVidstreamingIframeURL 
} = require('./animeHandler')
const animeUrl = require('../helpers/animeUrlHelper')




/* ################################################################### */
// Search

const search = async(keyword,page) => {

  const urlHelper = animeUrl.categoryUrls().search.url
  const urlExt = urlHelper({ keyword,page })

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



// animeContent
const animeContent = async(id) => {

  const urlHelper = animeUrl.categoryUrls().content.url
  const urlExt = urlHelper({ id })


  const promises = []
  promises.push(animeContentHandler(urlExt)
    .then(content => {

      return ({
        id,
        title: content[0] ? content[0].title : null,      
        img: content[0] ? content[0].img : null,
        synopsis: content[0] ? content[0].synopsis : null,
        genres: content[0] ? content[0].genres : null,
        
        released: content[0] ? content[0].released : null,
        status: content[0] ? content[0].status : null,
        otherName: content[0] ? content[0].otherName : null,        
      })
    }
  ));
  return await Promise.all(promises)
};



// episodeList
const episodeList = async(id) => {

  const urlHelper = animeUrl.categoryUrls().episodeList.url
  const urlExt = urlHelper({ id })


  const promises = []
  promises.push(animeEpisodeListHandler(urlExt)
    .then(info => {
      console.log()

      return ({
        id,
        title: info[0] ? info[0].title : null,
        totalEpisodes: info[0] ? info[0].totalEpisodes : null,
        episodes: info[0] ? info[0].episodes: null
      })
    }
  ));
  return await Promise.all(promises)
};








module.exports = {
  search,
  animeContent,
  episodeList
}