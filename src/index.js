// Read environment variables
require('dotenv').config();

const app = require('./server');
require('./public/database');

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
  //console.log('Environment:', process.env.NODE_ENV);
});