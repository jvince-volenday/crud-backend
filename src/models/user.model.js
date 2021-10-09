const mongoose = require('mongoose')



const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String },
  birthday: { type: String, default: Date.now },
  age: { type: Number }
})



module.exports = mongoose.model('User',UserSchema)


/*


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://crudTrainee:<password>@crud.51t5b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/

