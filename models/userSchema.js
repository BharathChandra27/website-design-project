// Defining user Schema
const mongoose = require('mongoose')
// Connecting to DB
mongoose.connect('mongodb://localhost:27017/MyDatabase')

var Schema = mongoose.Schema
var registerSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address : String    
}, {collection: 'UserDB'})

var db = mongoose.model('db', registerSchema)

// Builtin data for administrator login
var builtIn = {
    firstname: 'Bharath',
    lastname: 'Chandra',
    email: 'name@gmail.com',
    password: 'admin',
    address: 'My Address'
}
var ok = new db(builtIn)
ok.save()

module.exports = db