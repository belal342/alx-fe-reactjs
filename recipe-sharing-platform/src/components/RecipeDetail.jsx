import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => {
        const foundRecipe = data.find(r => r.id === parseInt(id))
        setRecipe(foundRecipe)
      })
  }, [id])

  if (!recipe) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-700 mb-6">{recipe.summary}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients?.map((ing, i) => (
                <li key={i}>{ing}</li>
              )) || <li>No ingredients listed</li>}
            </ul>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-2">
              {recipe.instructions?.map((step, i) => (
                <li key={i}>{step}</li>
              )) || <li>No instructions provided</li>}
            </ol>
          </div>
          
          <Link 
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}