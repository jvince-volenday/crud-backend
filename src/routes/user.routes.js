const express = require('express')
const router = express.Router()
const user = require('./../controllers/user.controllers')





// user routes
router.get('/', (req,res) => {
  const users = { 
    "routes": ['create','all',':userId','update/:userId','delete/:userId']
  }
  res.json(users)
})
router.post('/create', user.create)
router.get('/all', user.findAll)
router.get('/:userId', user.findOne)
router.put('/update/:userId', user.update)
router.delete('/delete/:userId', user.userDelete)





module.exports = router
