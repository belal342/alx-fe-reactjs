import { useParams, Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  )

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <div className="recipe-actions">
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
        <Link to="/" className="back-link">← Back to all recipes</Link>
      </div>
    </div>
  )
}

export default RecipeDetails