import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json'; // Import the JSON file directly

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Using the directly imported data
      setRecipes(recipeData);
      setLoading(false);
    } catch (err) {
      setError("Failed to load recipes");
      setLoading(false);
      console.error("Error loading recipes:", err);
    }
  }, []);

  if (loading) return <div className="text-center py-8">Loading recipes...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Recipe Sharing Platform</h1>
        
        <Link 
          to="/add-recipe"
          className="mb-8 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
        >
          Add New Recipe
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-48 object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 mb-4">{recipe.summary}</p>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}