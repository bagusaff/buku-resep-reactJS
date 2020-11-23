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
    handleRecipeSelect
  }

  function handleRecipeAdd(){
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 2,
      cookTime: '1:00',
      instructions:'Instr.',
      ingredients: [
        { id: uuidv4(), name: 'Name', amount: '1Tbs'}
      ]
    }
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id){
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
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
    id:1,
    name:'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instruction:`1.Put salt on Chicken\n2.Eat Chicken`,
    ingredients:[
      {
        id:1,
        name:'Chicken',
        amount:'2 Kilo'
      },
      {
        id:2,
        name:'Salt',
        amount:'2 Sendok'
      }
    ]
  },
  {
    id:2,
    name:'Plain Pork',
    servings: 4,
    cookTime: '2:25',
    instruction:`1.Put salt on Pork \n2.Eat Pork`,
    ingredients:[
      {
        id:1,
        name:'Pork',
        amount:'2 Kilo'
      },
      {
        id:2,
        name:'Salt',
        amount:'2 Sendok'
      }
    ]
  }
]