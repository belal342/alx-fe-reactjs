import React from 'react'
import { Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'
import SearchBar from './SearchBar'
import RecipeFilters from './RecipeFilters'

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes)
  const recipes = useRecipeStore(state => state.recipes)
  const initializeSampleRecipes = useRecipeStore(state => state.initializeSampleRecipes)

  return (
    <div className="recipe-list-container">
      <div className="search-and-filters">
        <SearchBar />
        <RecipeFilters />
      </div>

      <div className="results-info">
        <p>
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
        {recipes.length === 0 && (
          <button onClick={initializeSampleRecipes} className="sample-recipes-btn">
            Load Sample Recipes
          </button>
        )}
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <p>No recipes match your search criteria</p>
          {recipes.length > 0 && (
            <button onClick={() => useRecipeStore.getState().resetFilters()} className="reset-filters-btn">
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p className="recipe-description">
                  {recipe.description.substring(0, 100)}...
                </p>
                <div className="recipe-meta">
                  {recipe.prepTime && <span>⏱ {recipe.prepTime} mins</span>}
                  {recipe.difficulty && <span>⚡ {recipe.difficulty}</span>}
                  {recipe.ingredients && <span>🍴 {recipe.ingredients.length} ingredients</span>}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList