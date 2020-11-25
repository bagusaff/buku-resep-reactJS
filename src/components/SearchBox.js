import React, {useContext} from 'react'
import {RecipeContext} from './App'

export default function SearchBox() {
    const {handleRecipeSearch} = useContext(RecipeContext)
    function handleChange(changes){
        handleRecipeSearch(changes)
    }
    return (
        <div>
            <span><input type="text" id="searchTerms" onChange={e=> handleChange({searchTerm: e.target.value})} className="search-box__input" placeholder="Cari resep disini  "></input></span>
        </div>
    )
}
