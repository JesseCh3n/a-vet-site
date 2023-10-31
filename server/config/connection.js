const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/vet-site');

const fixieData = process.env.FIXIE_SOCKS_HOST.split(new RegExp('[/(:\\/@/]+'));

mongoose.connect(process.env.DB_CONNECTION,
    {
      proxyUsername: fixieData[0],
      proxyPassword: fixieData[1],
      proxyHost: fixieData[2],
      proxyPort: fixieData[3]
     },
    (error) => {
      if(error){
        console.log(error)
      }
      console.log('Connected to database')}
)

module.exports = mongoose.connection;
