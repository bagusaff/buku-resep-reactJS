import React ,{ useState, useEffect }from 'react'
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import '../css/app.css'
import {v4 as uuidv4} from 'uuid';


export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

export default function App() {
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const selectedRecipe = recipes.find(recipe=> recipe.id === selectedRecipeId)
  
  useEffect(()=>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeAdd(){
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions:'',
      ingredients: [
        { id: uuidv4(), name: '', amount: ''}
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id){
    if(selectedRecipeId!= null && selectedRecipeId === id ){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

  function handleRecipeChange(id, recipe){
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  return (
    <>
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/> }
    </RecipeContext.Provider>
    </>
  )
}

//Create array for dynamic recipe
const sampleRecipes = [
  {
    id:uuidv4(),
    name:'Mie Goreng',
    servings: 1,
    cookTime: '0:05',
    instruction:`1.Rebus Mie\n2.Siapkan Bumbu di piring \n3.Buang sisa air rebusan\n4.Campurkan mie dengan bumbu`,
    ingredients:[
      {
        id:uuidv4(),
        name:'Mie Goreng',
        amount:'1 Bungkus'
      },
      {
        id:uuidv4(),
        name:'Air',
        amount:'200 mililiter'
      }
    ]
  }
]