const express = require('express');
const router = express.Router();
const api = require('../controllers/animePageController')






// anime pages routes
router.get('/', (req,res) => {
  const anime = {
    title: 'Gogoanime Pages',
    base: 'anime/pages/',
    entries: {
    	param2: {
    		params: ['subcategory','page'],
    		group1: {
    			categories: ['anime-list','anime-pages'],
	      	subcategories: ['all','0','alphabet-letters'],
    		},
	      group2: {
    			categories: ['genres'],
	      	subcategories: ['actions,fantasy,...etc'],
	      }
    	},
    	params3: {
	      group1: {
    			params: ['year','season','page'],
    			categories: ['seasons'],
	    		years: {
	    			start: '2014',
	    			end: 'current year'
	    		},
	    		seasons: ['winter','spring','sumemer','fall']
	      }
    	}
    }
  }


  console.log(anime)
  res.json(anime)
});





/* ################################################################### */
// pages

router.get('/pages/:category/:subcategory/:page', (req,res) => {
  const category = req.params.category.toLowerCase()
  const categoryA = ['Genre','Genres']
  const categoriesA = [...categoryA,...categoryA.map(val => val.toLowerCase()),...categoryA.map(val => val.toUpperCase())]
  
  const subcategoryAll = ['All','all','ALL']
  const subcategoryNum = ['Digit','0',0]

  let subcategory = req.params.subcategory ? req.params.subcategory.toUpperCase() : 'All'
  if(subcategoryAll.includes(subcategory)) subcategory = 'All'
  else if(subcategoryNum.includes(subcategory)) subcategory = '0'
  if(categoriesA.includes(category)) subcategory = req.params.subcategory ? req.params.subcategory.toLowerCase() : 'action'
  const page = req.params.page ? req.params.page : 1
  

  api.pages(category,subcategory,page)
    .then(resPages => {
      const pages = {
        category,
        subcategory,
        page,
        list: resPages
      }

      res.status(200).json(pages)
    })
    .catch((error) => console.log("error"))
});





module.exports = router
