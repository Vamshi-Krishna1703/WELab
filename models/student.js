const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : String,
    age : Number,
    branch : String,
    grade : String,
    date : {type : Date , default: Date.now}
})

module.exports = mongoose.model('Students', studentSchema)