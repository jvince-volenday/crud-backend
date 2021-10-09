





function categoryValues() {


	return {
		ongoingSeries: { default: 'ongoing-series', camelCase: 'ongoingSeries' },
		seasonList: { default: 'season-list', camelCase: 'seasonList' },
		recentlyAdded: { default: 'recently-added', camelCase: 'recentlyAdded'},

	  newSeason: { default: 'new-season', camelCase: 'newSeason' },
	  popular: { default: 'popular', camelCase: 'popular' },
	  recentRelease: { default: 'recent-release', camelCase: 'recentRelease' },


	  animeList: { default: 'anime-list', camelCase: 'animeList' },
	  movies: { default: 'anime-movies', camelCase: 'movies' },
	  genres: { default: 'genres', camelCase: 'genres' },


	  seasons: { default: 'seasons', camelCase: 'seasons' },

	  search: { default: 'search', camelCase: 'search' },
	  info: { default: 'info', camelCase: 'info' },
	  content: { default: 'content', camelCase: 'content' },
	  episodeList: { default: 'episode-list', camelCase: 'episodeList' },
	  episodes: { default: 'episodes', camelCase: 'episodes' },
	}
}



function categoryUrls() {

  const all = ['All','all','ALL']
  const num = ['Digit','digit','DIGIT','0',0]
	const pageValue = (page = 1) => page


	const urls = {
		ongoingSeries: () => '',
		seasonList: () => '',
		recentlyAdded: () => '',

	  newSeason: (data) => `new-season.html?page=${pageValue(data.page)}`,
	  popular: (data) => `popular.html?page=${pageValue(data.page)}`,
	  recentRelease: (data) => `?page=${pageValue(data.page)}`,


	  animeList: (data) => { 
		  const subcategory = data.subcategory ? data.subcategory : ''
		  let urlExt = 'anime-list'


		  if(all.includes(subcategory)) urlExt += `.html?page=${pageValue(data.page)}`
		  else if(num.includes(subcategory)) urlExt += `-0?page=${pageValue(data.page)}`
		  else urlExt += `-${subcategory}?page=${pageValue(data.page)}`


		  return urlExt
	  },
	  movies: (data) => { 
		  const subcategory = data.subcategory ? data.subcategory : ''
		  let urlExt = 'anime-movies.html?'


		  if(all.includes(subcategory)) urlExt += `aph=&page=${pageValue(data.page)}`
		  else if(num.includes(subcategory)) urlExt += `aph=0&page=${pageValue(data.page)}`
		  else urlExt += `aph=${subcategory}&page=${pageValue(data.page)}`

		  return urlExt
		},
	  genres: (data) => {
	  	const genre = data.genre ? data.genre : 'action'
	  	const urlExt = `genre/${genre}?page=${pageValue(data.page)}`

	  	return urlExt
	  },


	  seasons: (data) => {

	  	// `/sub-category/Winter-2014-anime?page=1`

	  	// const season = data.season ? data.season : 'Winter'
	  	// const year = data.year ? data.year : '2014'
	  	// const subcategory = `${season}-${year}-anime`
	  	const subcategory = data.subcategory ? data.subcategory : 'winter-2014-anime'
	  	

	  	const urlExt = `sub-category/${subcategory}?page=${pageValue(data.page)}`
	  	return urlExt
	  },


	  search: (data) => `search.html?keyword=${data.keyword}&page=${pageValue(data.page)}`,
	  content: (data) => `/category/${data.id}`,
	  episodeList: (data) => `/category/${data.id}`,
	  episodes: (data) => `${data.id}`,
	}

	const values = categoryValues()
	const mappedCategoryUrls = {}
	for(const key in urls) {


		if(values[key]) 
			mappedCategoryUrls[key] = {
				category: values[key].default,
				url: urls[key]
			}
	}

	return mappedCategoryUrls
}





module.exports = {
	categoryValues,
	categoryUrls
}