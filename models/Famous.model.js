const { Schema, model } = require('mongoose')

const famousSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    occupation: {
        type: String,
        default: 'Unknown'
    },

    catchPhrase: String 
})

const Famous = model('Famous', famousSchema)

module.exports = Famous