import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import NotFound from './components/NotFound'
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 onClick={() => navigate('/')}>Recipe Sharing</h1>
        <nav className="app-nav">
          <Link to="/" className="nav-link">All Recipes</Link>
          <Link to="/add" className="nav-link">Add Recipe</Link>
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          {/* Home route showing all recipes */}
          <Route path="/" element={<RecipeList />} />
          
          {/* Add new recipe */}
          <Route path="/add" element={<AddRecipeForm />} />
          
          {/* Recipe details page */}
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          
          {/* Edit existing recipe */}
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
          
          {/* 404 page for undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Recipe Sharing App</p>
      </footer>
    </div>
  )
}

export default App