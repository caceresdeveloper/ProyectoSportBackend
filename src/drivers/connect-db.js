const mongoose = require('mongoose')

/* The code is configuring and establishing a connection to a MongoDB database using the Mongoose
library in JavaScript. */
mongoose.set('strictQuery', false)

const options = {
    useNewUrlParser:true, useUnifiedTopology:true
}

mongoose.connect(process.env.MONGODB_URI, options).then(()=>{
    console.log("Connected to db")
})
.catch((error) =>{
    console.log(error)
})

module.exports = mongoose