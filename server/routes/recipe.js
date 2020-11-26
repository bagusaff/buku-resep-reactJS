const router = require('express').Router()
const { getNodeText } = require('@testing-library/react')
const {Recipe} = require('../models/recipe-model')

router.route('/').get((req,res)=>{
    Recipe.find()
    .then(recipes=>res.json(recipes))
    .catch(err=> res.status(400).json('Error'+err))
})

router.route('/').post(async(req,res)=>{
    try{        
        const recipe = new Recipe(req.body);
        const uploadedRecipe = recipe.save();
        console.log(uploadedRecipe)
    } catch(error) {
        res.status(422);
    }
})
