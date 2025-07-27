import React, { useState } from 'react'
import useRecipeStore from '../store/recipeStore'

const difficultyOptions = ['Easy', 'Medium', 'Hard']

const RecipeFilters = () => {
  const { filters, setFilters, resetFilters } = useRecipeStore()
  const [ingredientInput, setIngredientInput] = useState('')

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFilters({
        ingredients: [...filters.ingredients, ingredientInput.trim()]
      })
      setIngredientInput('')
    }
  }

  return (
    <div className="recipe-filters">
      <h3>Filter Recipes</h3>
      
      <div className="filter-group">
        <label>By Ingredients:</label>
        <div className="ingredient-input">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder="Add ingredient filter"
          />
          <button onClick={handleAddIngredient}>Add</button>
        </div>
        {filters.ingredients.length > 0 && (
          <div className="ingredient-tags">
            {filters.ingredients.map((ing, index) => (
              <span key={index} className="ingredient-tag">
                {ing}
                <button 
                  onClick={() => setFilters({
                    ingredients: filters.ingredients.filter((_, i) => i !== index)
                  })}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="filter-group">
        <label>Max Preparation Time (mins):</label>
        <input
          type="number"
          value={filters.maxPrepTime || ''}
          onChange={(e) => setFilters({
            maxPrepTime: e.target.value ? parseInt(e.target.value) : null
          })}
          placeholder="No limit"
          min="1"
        />
      </div>

      <div className="filter-group">
        <label>Difficulty:</label>
        <select
          value={filters.difficulty || ''}
          onChange={(e) => setFilters({
            difficulty: e.target.value || null
          })}
        >
          <option value="">Any</option>
          {difficultyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button onClick={resetFilters} className="reset-filters">
        Reset All Filters
      </button>
    </div>
  )
}

export default RecipeFilters