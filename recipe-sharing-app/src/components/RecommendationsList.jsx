import { Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)

  return (
    <div className="recommendations-list">
      <h2>Recommended For You</h2>
      {recommendations.length === 0 ? (
        <p className="empty-message">
          Save some favorites to get personalized recommendations!
        </p>
      ) : (
        <div className="recipe-grid">
          {recommendations.map(recipe => (
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

export default RecommendationsList