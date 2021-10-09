const axios = require('axios')
const cloudscraper = require('cloudscraper')
const cheerio = require('cheerio')
const animeEnv = require('../animeEnv')





// Anime Content
const animeContentHandler = async (id) => {
  const res = await axios.get(`${animeEnv.BASE_URL}${id}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  $('div#wrapper_bg').each((index,element) => {
    const $element = $(element)
    const title = $element.find('div.anime_info_body_bg h1').text()
    const img = $element.find('div.anime_info_body_bg img').attr('src')
    const synopsis = $element.find('div.anime_info_body_bg p.type').eq(1).text()
    

    const genres = []
    $element.find('div.anime_info_body_bg p.type').eq(2).find('a').each((j,el) => {
      const $el = $(el)
      const genre = $el.attr('href').split('/')[4]
      genres.push(genre)
    })


    // const category = $element.find('div.anime_info_body_bg p.type').eq(0).find('a').attr('title').replace('Anime' , '').trim().match(/[a-zA-Z]+/g)[0]
    const releasedTitle = $element.find('div.anime_info_body_bg p.type').eq(0).find('a').attr('title').trim()
    const releasedId = $element.find('div.anime_info_body_bg p.type').eq(0).find('a').attr('href').trim()
    // const released = parseInt($element.find('div.anime_info_body_bg p.type').eq(3).text().match(/\d+/g) , 10)
    const status = $element.find('div.anime_info_body_bg p.type').eq(4).text().replace('Status:' , '').trim()
    const otherName = $element.find('div.anime_info_body_bg p.type').eq(5).text().replace('Other name:' , '').trim()


    const liTotal = $('div.anime_video_body ul#episode_page li').length
    var totalEpisodes = parseInt($('div.anime_video_body ul#episode_page li').eq(liTotal - 1).find('a').text().split('-')[1] , 10)
    if(!totalEpisodes) {
       totalEpisodes = parseInt($('div.anime_video_body ul#episode_page li').eq(liTotal - 1).find('a').text() , 10)
    }

    

    promises.push({
      title,
      img,
      synopsis,
      genres,

      
      // category
      released: {
        releasedTitle,
        releasedId
      },
      status,
      otherName,
    })
  })
  return await Promise.all(promises)
};



// Anime Episode List 
const animeEpisodeListHandler = async (id) => {
  const res = await axios.get(`${animeEnv.BASE_URL}${id}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  let check_zero_episode = false;
  const check_zero_episode_axios = await axios.get(`${animeEnv.BASE_URL}/${id.split('/')[2]}`)
  const check_zero_episode_body = await check_zero_episode_axios.data
  const check_zero_episode_cheerio = cheerio.load(check_zero_episode_body)
  if(check_zero_episode_cheerio('.entry-title').text()!='404') {
    check_zero_episode = true
  }



  $('div#wrapper_bg').each((index,element) => {
    const $element = $(element)
    const title = $element.find('div.anime_info_body_bg h1').text()


    const liTotal = $('div.anime_video_body ul#episode_page li').length
    var totalEpisodes = parseInt($('div.anime_video_body ul#episode_page li').eq(liTotal - 1).find('a').text().split('-')[1] , 10)
    if(!totalEpisodes) {
       totalEpisodes = parseInt($('div.anime_video_body ul#episode_page li').eq(liTotal - 1).find('a').text() , 10)
    }

    
    let episodes = Array.from({length: totalEpisodes}, (v,k) => {
      const animeTitle = `EP ${k + 1}`
      const animeId = `${id}-episode-${k + 1}`.slice(10)
      return {
        title: animeTitle,
        id: animeId
      }
    })
    if(check_zero_episode) {
      episodes.unshift({id:id.split('/')[2]})
    }



    promises.push({
      title,
      totalEpisodes: check_zero_episode ? totalEpisodes+1 : totalEpisodes,
      episodes
    })
  })
  return await Promise.all(promises)
};



// Anime Episode Links
const animeEpisodeHandler = async(id) => {
  const res = await axios.get(`${animeEnv.BASE_URL}/${id}`)
  const body = await res.data
  const $ = cheerio.load(body)
  const promises = []



  $('div#wrapper_bg').each((index,element) => {
    const $element = $(element)

    const animeTitle = $element.find('div.anime_video_body div.anime_video_body_cate div.anime-info a').attr('title')
    const animeId = $element.find('div.anime_video_body div.anime_video_body_cate div.anime-info a').attr('href')
    const seasonTitle = $element.find('div.anime_video_body div.anime_video_body_cate a').attr('title').trim()
    const seasonId = $element.find('div.anime_video_body div.anime_video_body_cate a').attr('href').split('/')[2].trim()

    const download = $element.find('div.anime_video_body div.anime_video_body_cate div.favorites_book ul li.dowloads a').attr('href')

    const prevTitle = $element.find('div.anime_video_body div.anime_video_body_episodes div.anime_video_body_episodes_l a').text()
    const prevId = $element.find('div.anime_video_body div.anime_video_body_episodes div.anime_video_body_episodes_l a').attr('href')
    const nextTitle = $element.find('div.anime_video_body div.anime_video_body_episodes div.anime_video_body_episodes_r a').text()
    const nextId = $element.find('div.anime_video_body div.anime_video_body_episodes div.anime_video_body_episodes_r a').attr('href')


    const servers = []
    $element.find('div.anime_muti_link ul li').each((j,el) => {
      const $el = $(el)
      const name = $el.find('a').text().substring(0 , $el.find('a').text().lastIndexOf('C')).trim()
      let iframe = $el.find('a').attr('data-video')


      if(iframe.startsWith('//')) {
        iframe = $el.find('a').attr('data-video').slice(2)
      } 
      
      servers.push({
        name: name,
        iframe: !iframe.includes('https://') ? `https://${iframe}` : iframe
      });
    })



    promises.push({

      title: {
        animeTitle,
        animeId
      },
      seasons: {
        seasonTitle,
        seasonId
      },
      servers: servers ? servers : null,
      download,
      links: {
        prevTitle: prevTitle !== '' ? prevTitle : null,
        prevId: prevId !== '' ? prevId : null,
        nextTitle: nextTitle !== '' ? nextTitle : null,
        nextId: nextId !== '' ? nextId : null,
      }
    })
  })
  return await Promise.all(promises)
}



// Anime Servers
const decodeVidstreamingIframeURL = async(url) => {
  const _url = !url.includes('https://') ? `https://${url}` : url
  let realUrl = _url


  if(_url.includes('streaming')) {
    realUrl = _url.replace(/streaming/g , 'check').trim()
    if(realUrl.includes('vidcheck.io')) {
      realUrl = _url.replace(/vidcheck.io/g , 'vidstreaming.io').trim()
    }
  }
  if(_url.includes('load')) {
    realUrl = _url.replace(/load/g , 'check').trim()
  }
  if(_url.includes('server')) {
    realUrl = _url.replace(/server/g , 'check').trim()
  }


  const data = await cloudscraper(realUrl)
  const match = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  const _URLs = String(data)
    .match(match)
    .filter(url => url.includes('.mp4') || url.includes('.m3u8'))


  const URLs = []
  Array.from({length: _URLs.length} ,(v,k) => {
    const option = k + 1
    let url = _URLs[k]


    if(!url.includes('https://')){
      url = `https://${url}`
    }

    URLs.push({
      option: option || null,
      url: url || null
    })
  })
  return Promise.all(URLs)
}





module.exports = {
  animeContentHandler,
  animeEpisodeListHandler,
  animeEpisodeHandler,
  decodeVidstreamingIframeURL,
}
