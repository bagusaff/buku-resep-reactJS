import React, {useContext} from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import {RecipeContext} from './App'
import {v4 as uuidv4} from 'uuid'

export default function RecipeEdit({recipe}) {
    const {handleRecipeChange, handleRecipeSelect} = useContext(RecipeContext)
    function handleChange(changes){
        handleRecipeChange(recipe.id,{ ...recipe, ...changes }) 
    }

    function handleIngredientChange(id,ingredient){
    const newIngredients = [...recipe.ingredients]
    const index = newIngredients.findIndex(i => i.id === id)
    newIngredients[index] = ingredient
    handleChange({ingredients: newIngredients})
    }

    function handleIngredientAdd(){
        const newIngredient={
            id:uuidv4(),
            name:'',
            amount:'',
        }
        handleChange({ingredients:[...recipe.ingredients, newIngredient]})
    }
    function handleIngredientDelete(id){
        handleChange({ingredients: recipe.ingredients.filter(i=> i.id !== id)})
    }

    return (
        <div className ="recipe-edit">
            <div className="recipe-edit__remove-button-container">
                <button className="btn recipe-edit__remove-button" onClick={()=> handleRecipeSelect(undefined)}>&times;</button>
            </div>
            <div className="recipe-edit__details-grid">
                <label htmlFor="name" className="recipe-edit__label">Nama</label>
                <input type="text" name="name" id="name" className="recipe-edit__input" value={recipe.name} onChange={e => handleChange({name: e.target.value})}/>
                <label htmlFor="cookTime" className="recipe-edit__label">Waktu Masak</label>
                <input type="text" name="cookTime" id="cookTime" className="recipe-edit__input" value={recipe.cookTime} onChange={e => handleChange({cookTime: e.target.value})}/>
                <label htmlFor="servings" className="recipe-edit__label">Penyajian untuk</label>
                <input type="number" min="1" name="servings" id="servings" className="recipe-edit__input" value={recipe.servings} onChange={e => handleChange({servings: parseInt(e.target.value) || ''})}/>
                <label htmlFor="instructions" className="recipe-edit__label">Langkah-langkah</label>
                <textarea name="instructions" id="instructions" className="recipe-edit__input" value={recipe.instruction} onChange={e => handleChange({instruction: e.target.value})}/>
            </div>
            <br />
            <label className="recipe-edit__label">Bahan-bahan</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Nama</div>
                <div>Jumlah</div>
                <div></div>
                {recipe.ingredients.map(ingredient=>(
                    <RecipeIngredientEdit 
                    key={ingredient.id} 
                    handleIngredientDelete ={handleIngredientDelete}
                    handleIngredientChange = {handleIngredientChange}
                    ingredient={ingredient}
                    />
                ))}
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button className="btn btn--primary" onClick={()=>handleIngredientAdd()}>Tambahkan bahan</button>
            </div>
            <br />
            <div className="recipe-edit__details-grid">
            <label htmlFor="name" className="recipe-edit__label">Nama Pembuat</label>
                <input type="text" name="chef" id="chef" className="recipe-edit__input" value={recipe.chef} onChange={e => handleChange({chef: e.target.value})}/>
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button className="btn btn--primary" onClick={()=>handleIngredientAdd()}>Bagikan Resep</button>
            </div>
        </div>
    )
}
