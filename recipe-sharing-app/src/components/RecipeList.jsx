import { Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>Recipes</h2>
        <Link to="/" className="add-recipe-link">+ Add New Recipe</Link>
      </div>
      
      {recipes.length === 0 ? (
        <div className="empty-state">
          <p>No recipes yet. Add your first recipe!</p>
          <Link to="/" className="add-recipe-button">Create Recipe</Link>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p className="recipe-description">
                  {recipe.description.length > 150 
                    ? `${recipe.description.substring(0, 150)}...` 
                    : recipe.description}
                </p>
                <span className="view-details">View Details →</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList