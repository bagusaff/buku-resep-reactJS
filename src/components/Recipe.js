import React, {useContext} from 'react'
import IngredientList from './IngredientList'
import {RecipeContext} from './App'
export default function Recipe(props) {
    const {handleRecipeDelete,handleRecipeSelect} = useContext(RecipeContext)
    const{
        id,
        name,
        cookTime,
        servings,
        instruction,
        ingredients,
        chef
    } = props

    return (
        <div className="recipe">
            <div className="recipe__header">
                <h3 className="recipe__title">{name}</h3>
                <div>
                    <button 
                    className="btn btn--primary mr-1"
                    onClick={()=> handleRecipeSelect(id)}
                    >Edit</button>
                    <button 
                    className="btn btn--danger"
                    onClick={()=> handleRecipeDelete(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="recipe__row">
                <span className="recipe__label">Lama Pembuatan:</span>
                <span className="recipe__value">{cookTime}</span>
            </div>
            <div className="recipe__row">
                <span className="recipe__label">Penyajian untuk:</span>
                <span className="recipe__value">{servings}</span>
            </div>
            <div className="recipe__row">
                <span className="recipe__label">Langkah-langkah:</span>
                <div className="recipe__value recipe__value--tab recipe__instruction">
                    {instruction}
                </div>
            </div>
            <div className="recipe__row">
                <span className="recipe__label">Bahan yang dibutuhkan:</span>
                <div className="recipe__value recipe__value--tab">
                    <IngredientList ingredients={ingredients} />
                </div>
            </div>
            <div className="recipe__row">
                <span className="recipe__label">Pembuat Resep:</span>
                <span className="author">{chef}</span>
            </div>
        </div>
    )
}
