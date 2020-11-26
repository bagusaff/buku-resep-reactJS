const mongoose = require('mongoose')
const {Schema} = mongoose;

const recipeSchema = new Schema({
    id:String,
    name: String,
    servings: Number,
    cookTime: String,
    instruction: String,
    ingredients:[{
        id:String,
        name:Number,
        amount:Number
    }]
}, {
    timestamps:true,
})


const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = {Recipe}