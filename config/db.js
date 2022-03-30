const mongoose = require('mongoose')

const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
} catch (err) {
    console.error(err)
    process.exit(1)
}
}

module.exports = connectDB

// const mongoose = require('mongoose');
// require('dotenv').config({path: './config.env'});

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,
//             useUnifiedTopology: true,})
//         console.log(`MongoDB connected : ${conn.connection.host}`)
//     } catch (error) {
//         console.log(error)
//         process.exit
//     }
// }

// module.exports = connectDB

// passport.serializeUser((user, done)=>{
//     done(null, user.id)
// }); 
  
// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => done(err, user))
//   })