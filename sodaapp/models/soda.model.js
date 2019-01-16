var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var SodaSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
})

SodaSchema.plugin(mongoosePaginate)
const Soda = mongoose.model('Soda', SodaSchema)

module.exports = Soda;