import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'

const difficultyOptions = ['Easy', 'Medium', 'Hard']

const AddRecipeForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const addRecipe = useRecipeStore(state => state.addRecipe)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return
    
    const ingredientsArray = ingredients
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0)
    
    addRecipe({ 
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredientsArray,
      prepTime: prepTime ? parseInt(prepTime) : undefined,
      difficulty: difficulty || undefined
    })
    navigate('/')
  }

  return (
    <div className="recipe-form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title*:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description*:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients (comma separated):</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="flour, sugar, eggs, etc."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Preparation Time (minutes):</label>
            <input
              type="number"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Select difficulty</option>
              {difficultyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            Save Recipe
          </button>
          <Link to="/" className="btn secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AddRecipeForm