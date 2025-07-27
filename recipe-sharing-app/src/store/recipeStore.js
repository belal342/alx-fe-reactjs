import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      
      // Add a new recipe
      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, {
          ...recipe,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),
      
      // Delete a recipe
      deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id)
      })),
      
      // Update a recipe
      updateRecipe: (updatedRecipe) => set((state) => ({
        recipes: state.recipes.map(recipe => 
          recipe.id === updatedRecipe.id 
            ? { ...updatedRecipe, updatedAt: new Date().toISOString() } 
            : recipe
        )
      })),
      
      // Get single recipe
      getRecipe: (id) => get().recipes.find(recipe => recipe.id === id),
      
      // Initialize sample data
      initSampleData: () => set({
        recipes: [
          {
            id: 1,
            title: "Classic Margherita Pizza",
            description: "Tomato sauce, mozzarella, and basil",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            title: "Chocolate Chip Cookies",
            description: "Classic homemade cookies",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      })
    }),
    {
      name: 'recipe-store',
      storage: localStorage
    }
  )
)

export default useRecipeStore