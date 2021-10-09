const User = require('./../models/user.model');
const helper = require('./../helpers/user.helpers');




  const dummies = [

    {
      id: '23456',
      firstname: "nag kula",
      lastname: "ngot",
      gender: "male",
      birthday: "1998-11-11",
      age: "22"
    },
    {
      id: '34567',
      firstname: "Pa",
      lastname: "not at",
      gender: "female",
      birthday: "2000-10-20",
      age: "21"
    },
    {
      id: '12345',
      firstname: "Umu",
      lastname: "tut si",
      gender: "male",
      birthday: "2011-11-11",
      age: "10"
    }
  ]

function create(req,res) {
  

  if(!req.body) res.status(500).send( {message: "User details should not be empty"} )

  let age = 0
  const birthday = req.body.birthday
  if(birthday) {
    const values = birthday.split("-")
    const year = values[0]
    const month = values[1]
    const date = values[2]
    age = helper.setAge(year,month,date)
  }

  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    birthday: req.body.birthday,
    age,
  }
  const user = new User(data)
  
  user.save(function(err,userRes) {
    if(err) res.status(500).send( { message: "Some error occurred while creating the user." } )
    else res.send(userRes)
  })
  console.log('create ',req.body,req.params)
}





function findAll(req,res) {
  
  User.find(function(err, userRes) {
    if(err) res.status(500).send( {message: "Some error occurred while retrieving the users." } )
    else res.send(userRes)
  })
  console.log('get all')
  // console.log('data =',dummies)
  // res.send(dummies)
}
function findOne(req,res) {

  User.findById(req.params.userId, function(err,userRes) {
    if(err) res.status(500).send( {message: "Could not retrieve user with id " + req.params.userId} )
    else res.send(userRes)
  })
  console.log(`get user ${req.params.userId}`)
/*  const index = dummies.findIndex(obj => obj.id === req.params.userId)
  if(index !== -1) { 
    const user = dummies[index]
    res.send(user)
  }*/
}





function update(req,res) {

  User.findById(req.params.userId, function(err, user) {
    if(err) res.status(500).send( {message: "Could not find a user with id " + req.params.userId } );


    let age = user.age ? user.age : null
    const birthday = req.body.birthday
    if(birthday) {
      const values = birthday.split("-")
      const year = values[0]
      const month = values[1]
      const date = values[2]

      age = helper.setAge(year,month,date)
    }


    user.firstname = req.body.firstname
    user.lastname = req.body.lastname 
    user.gender = req.body.gender 
    user.birthday = req.body.birthday
    user.age = age
  

    user.save(function(err,userRes) {
      if(err) res.status(500).send({message: "Could not update user with id " + req.params.userId});
      else res.send(userRes);
    });
  });
  
  console.log('update ',req.body,req.params)
};





function userDelete(req,res) {
  
  User.deleteOne({ _id: req.params.userId }, function(err,userRes) {
    if(err) res.status(500).send( { message: "Could not delete user with id " + req.params.userId } );
    else res.send( { message: "User deleted successfully!" } )
  });
  console.log('delete',req.params.userId)

  // const index = dummies.findIndex(obj => obj.id === req.params.userId)
  // if(index !== -1) dummies.filter((obj) => obj.id !== req.params.userId)
};





module.exports = {
	create,
	findAll,
	findOne,
	update,
	userDelete
}