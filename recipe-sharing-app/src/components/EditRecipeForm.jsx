import { useState } from 'react'
import useRecipeStore from '../store/recipeStore'
import { useNavigate } from 'react-router-dom'

const EditRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const updateRecipe = useRecipeStore((state) => state.updateRecipe)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim() || !description.trim()) return
    
    updateRecipe({
      id: recipe.id,
      title: title.trim(),
      description: description.trim()
    })
    navigate(`/recipes/${recipe.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h3>Edit Recipe</h3>
      <div className="form-group">
        <label htmlFor="edit-title">Title:</label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="edit-description">Description:</label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  )
}

export default EditRecipeForm