const axios = require('axios')
const cloudscraper = require('cloudscraper')
const cheerio = require('cheerio')

const animeEnv = require('../animeEnv')
const animeUrl = require('../helpers/animeUrlHelper')





/* ################################################################### */
// pages

const pages = async(category = '',data = {}) => {

  const urlObj = animeUrl.categoryUrls()
  let urlExt = ''


  for(const obj of Object.values(urlObj)) {
    if(category === obj.category) {
      urlExt = obj.url(data)
      break
    }
  }

  const res = await axios.get(`${animeEnv.BASE_URL}/${urlExt}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []


  
  $('div.main_body div.anime_name div.anime_name_pagination div.pagination ul.pagination-list li').each((index,element) => {
    const $element = $(element)
    // const page = $element.find('a').text().trim()
    const page = $element.text()


    promises.push(page ? page : -1)
  })
  return await Promise.all(promises)
};





module.exports = {
  pages
}