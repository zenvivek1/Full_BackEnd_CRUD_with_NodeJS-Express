const mongooose = require('mongoose')

mongooose.connect(process.env.MONGO_URI).then(
    console.log("Database Conneted")
)

const userSchema = mongooose.Schema({
    name : String,
    email : String,
    password : String
})

module.exports = mongooose.model("userModel",userSchema)