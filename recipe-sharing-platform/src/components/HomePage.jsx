import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setRecipes(recipeData);
      setLoading(false);
    } catch (err) {
      setError("Failed to load recipes");
      setLoading(false);
      console.error("Error loading recipes:", err);
    }
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-8 text-red-500">
      {error} - <button onClick={() => window.location.reload()} className="text-blue-600 underline">Try again</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Recipe Sharing Platform</h1>
          <Link 
            to="/add-recipe"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors duration-300 text-center"
          >
            Add New Recipe
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-48 sm:h-56 object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
              />
              <div className="p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">{recipe.summary}</p>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  className="inline-block w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded transition-colors duration-300"
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