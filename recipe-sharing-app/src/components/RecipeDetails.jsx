import { useParams, useNavigate, Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = useRecipeStore(state => state.getRecipe(Number(id)))
  const { 
    toggleFavorite, 
    isFavorite,
    deleteRecipe,
    generateRecommendations
  } = useRecipeStore()

  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations])

  if (!recipe) {
    return (
      <div className="error">
        <p>Recipe not found</p>
        <button onClick={() => navigate('/')}>Back to recipes</button>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipe.id)
      navigate('/')
    }
  }

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-actions">
          <button 
            onClick={() => toggleFavorite(recipe.id)}
            className={`favorite-btn ${isFavorite(recipe.id) ? 'active' : ''}`}
          >
            {isFavorite(recipe.id) ? '❤️ Saved to Favorites' : '🤍 Add to Favorites'}
          </button>
          <Link to={`/recipes/${recipe.id}/edit`} className="btn">
            Edit Recipe
          </Link>
          <button onClick={handleDelete} className="btn danger">
            Delete Recipe
          </button>
        </div>
      </div>

      <div className="recipe-meta">
        {recipe.prepTime && <span>⏱ Preparation: {recipe.prepTime} minutes</span>}
        {recipe.difficulty && <span>⚡ Difficulty: {recipe.difficulty}</span>}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="recipe-tags">
            {recipe.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="recipe-content">
        <div className="recipe-section">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </div>

        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="recipe-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}

        {recipe.instructions && (
          <div className="recipe-section">
            <h2>Instructions</h2>
            <ol className="instructions-list">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="recipe-footer">
        <p>Created: {new Date(recipe.createdAt).toLocaleDateString()}</p>
        {recipe.updatedAt !== recipe.createdAt && (
          <p>Last updated: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
        )}
        <Link to="/" className="back-link">← Back to all recipes</Link>
      </div>
    </div>
  )
}

export default RecipeDetails