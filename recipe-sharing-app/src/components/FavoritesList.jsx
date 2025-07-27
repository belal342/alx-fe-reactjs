import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const FavoritesList = () => {
  const { favorites, recipes, generateRecommendations } = useRecipeStore()
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id))

  useEffect(() => {
    generateRecommendations()
  }, [favorites, generateRecommendations])

  return (
    <div className="favorites-list">
      <h2>My Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p className="empty-message">You haven't favorited any recipes yet!</p>
      ) : (
        <div className="recipe-grid">
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p className="recipe-description">
                  {recipe.description.substring(0, 100)}...
                </p>
                <div className="recipe-meta">
                  {recipe.prepTime && <span>⏱ {recipe.prepTime} mins</span>}
                  {recipe.difficulty && <span>⚡ {recipe.difficulty}</span>}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesList