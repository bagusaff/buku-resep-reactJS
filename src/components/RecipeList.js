import React, {useContext} from 'react'
import Recipe from './Recipe'
import SearchBox from './SearchBox'
import {RecipeContext} from './App'

export default function RecipeList({recipes}) {
    const {handleRecipeAdd} = useContext(RecipeContext)
    
    return (
        <div className="recipe-list">
        <SearchBox/>
        <div>
        {recipes.map(recipe=>{
           return (
            <Recipe key={recipe.id} {...recipe} />
           )
        })}
        </div>
        <div className="recipe-list__add-recipe-btn-container">
            <button 
                className="btn btn--primary"
                onClick={handleRecipeAdd}
            >
                Tambah Resep
            </button>
        </div>
        </div>
    )
}
