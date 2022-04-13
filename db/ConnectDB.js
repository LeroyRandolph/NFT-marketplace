import mongoose from 'mongoose'

const ConnectDB = async () => {
  if (mongoose.connection.readyState == 0) {
    console.log('DB is not connected')
    const db = await mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.gxdik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log(db.connection.readyState)
  }else{
    console.log(mongoose.connection.readyState)
  }
}

// const express = require('express')

// const app = express()

// const ConnectDB = async () => {
//   const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'nft_marketplace',
//   })

//   db.connect((e) => {
//     if (e) {
//       console.log(e)
//     } else {
//       console.log('Connect DB successful')
//     }
//   })
// }

export default ConnectDB
