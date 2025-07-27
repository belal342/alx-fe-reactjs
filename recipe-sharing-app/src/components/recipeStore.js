import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      
      // Add a new recipe
      addRecipe: (newRecipe) => 
        set((state) => ({
          recipes: [...state.recipes, {
            ...newRecipe,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }]
        })),
      
      // Delete a recipe by ID
      deleteRecipe: (recipeId) =>
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== recipeId)
        })),
      
      // Update an existing recipe
      updateRecipe: (updatedRecipe) =>
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === updatedRecipe.id 
              ? { 
                  ...updatedRecipe, 
                  updatedAt: new Date().toISOString() 
                } 
              : recipe
          )
        })),
      
      // Get a single recipe by ID
      getRecipe: (recipeId) => {
        return get().recipes.find((recipe) => recipe.id === recipeId)
      },
      
      // Search recipes by title or description
      searchRecipes: (query) => {
        const lowerCaseQuery = query.toLowerCase()
        return get().recipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(lowerCaseQuery) ||
            recipe.description.toLowerCase().includes(lowerCaseQuery)
        )
      },
      
      // Clear all recipes
      clearRecipes: () => set({ recipes: [] }),
      
      // Initialize with sample data
      initializeSampleRecipes: () => {
        const sampleRecipes = [
          {
            id: 1,
            title: "Classic Margherita Pizza",
            description: "Simple and delicious pizza with tomato sauce, fresh mozzarella, and basil.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            title: "Chocolate Chip Cookies",
            description: "Soft and chewy cookies with melty chocolate chips.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
        set({ recipes: sampleRecipes })
      }
    }),
    {
      name: 'recipe-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({ recipes: state.recipes }), // persist only recipes
    }
  )
)

export default useRecipeStore