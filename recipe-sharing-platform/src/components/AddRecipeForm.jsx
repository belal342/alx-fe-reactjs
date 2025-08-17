import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    ingredients: '',
    instructions: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required'
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required'
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      // In a real app, you would save to an API here
      alert('Recipe submitted successfully!')
      navigate('/')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
            rows="3"
          />
          {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="ingredients">Ingredients (one per line)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
            rows="5"
          />
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="instructions">Instructions (one step per line)</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`}
            rows="8"
          />
          {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-300"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  )
}