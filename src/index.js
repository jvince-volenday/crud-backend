const dotenv = require('dotenv');
const app = require('./app');


const data = dotenv.config()
const port = process.env.PORT || 80;



app.listen(port, () => {
  console.log(`   http://localhost:${port}`);
});
