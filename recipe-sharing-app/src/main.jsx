import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import RecipeDetails from './components/RecipeDetails'

import './index.css'

/**
 * Main application router configuration
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <AddRecipeForm />
            <RecipeList />
          </>
        )
      },
      {
        path: 'recipes/:id',
        element: <RecipeDetails />,
        loader: async ({ params }) => {
          // In a real app, you might fetch the recipe here
          return { recipeId: parseInt(params.id) }
        }
      },
      {
        path: 'add-recipe',
        element: <AddRecipeForm />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)