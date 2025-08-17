import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddRecipeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    ingredients: [''],
    steps: ['']
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target; // Using target.value here
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        [field]: newArray
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    if (formData.ingredients.some(i => !i.trim())) newErrors.ingredients = 'All ingredients must be filled';
    if (formData.steps.some(s => !s.trim())) newErrors.steps = 'All steps must be filled';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, you would save to an API here
      console.log('Recipe submitted:', {
        ...formData,
        ingredients: formData.ingredients.filter(i => i.trim()),
        steps: formData.steps.filter(s => s.trim())
      });
      alert('Recipe submitted successfully!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Add New Recipe</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {/* Title Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="title">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter recipe title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Summary Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="summary">
              Recipe Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
              rows="3"
              placeholder="Brief description of your recipe"
            />
            {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
          </div>

          {/* Image URL Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="image">
              Image URL (optional)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Ingredients Fields */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Ingredients
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                  className={`flex-1 p-3 border rounded-lg ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={`Ingredient ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeField('ingredients', index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 rounded-lg transition-colors duration-300"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField('ingredients')}
              className="mt-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              + Add Ingredient
            </button>
            {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
          </div>

          {/* Steps Fields */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-2 font-medium">
              Preparation Steps
            </label>
            {formData.steps.map((step, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-gray-700">Step {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeField('steps', index)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white px-2 rounded transition-colors duration-300"
                  >
                    ×
                  </button>
                </div>
                <textarea
                  value={step}
                  onChange={(e) => handleArrayChange('steps', index, e.target.value)}
                  className={`w-full p-3 border rounded-lg ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
                  rows="2"
                  placeholder={`Describe step ${index + 1}`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField('steps')}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              + Add Step
            </button>
            {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 rounded-lg transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}