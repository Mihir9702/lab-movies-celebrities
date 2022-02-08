const { Schema, model, Types } = require('mongoose')

const movieSchema = Schema({
    title: {
        type: String,
        required: true,
    },

    genre: String,

    plot: String,


    cast: [
        {
            type: Types.ObjectId,
            ref: 'Famous'
        }
    ]
})

const Movie = model('Movie', movieSchema)

module.exports = Movie