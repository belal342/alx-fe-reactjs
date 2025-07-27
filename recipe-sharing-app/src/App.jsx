import { Routes, Route, Link, Outlet } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import NotFound from './components/NotFound'
import './App.css'

function App() {
  return (
    <div className="app">
      <nav className="app-nav">
        <Link to="/" className="nav-link">All Recipes</Link>
        <Link to="/add" className="nav-link">Add New Recipe</Link>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<RecipeList />} />
            <Route path="add" element={<AddRecipeForm />} />
            <Route path="recipes/:id" element={<RecipeDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

function HomeLayout() {
  return (
    <div className="home-layout">
      <h1>Recipe Sharing App</h1>
      <Outlet />
    </div>
  )
}

export default App