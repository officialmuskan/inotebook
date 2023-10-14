const mongoose = require('mongoose')
const {Schema} = mongoose
const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title: { type: String, required: true },// String is shorthand for {type: String}
    description: { type: String, required: true},
    tags: { type: String },   
    date: { type: Date, default: Date.now },
    
})
const Notes = mongoose.model('notes', NoteSchema);
module.exports = Notes