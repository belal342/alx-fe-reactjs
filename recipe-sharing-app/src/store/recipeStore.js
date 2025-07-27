import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      searchTerm: '',
      filters: {
        ingredients: [],
        maxPrepTime: null,
        difficulty: null
      },

      // Search and Filter Actions
      setSearchTerm: function(term) { set({ searchTerm: term }) },
      setFilters: function(newFilters) { 
        set({ filters: Object.assign({}, get().filters, newFilters) }) 
      },
      resetFilters: function() { 
        set({ 
          searchTerm: '',
          filters: {
            ingredients: [],
            maxPrepTime: null,
            difficulty: null
          }
        }) 
      },

      // Computed filtered recipes
      filteredRecipes: function() {
        const { recipes, searchTerm, filters } = get()
        const lowerCaseTerm = searchTerm.toLowerCase()
        
        return recipes.filter(function(recipe) {
          // Search term matching
          const matchesSearch = searchTerm === '' || 
            recipe.title.toLowerCase().includes(lowerCaseTerm) ||
            recipe.description.toLowerCase().includes(lowerCaseTerm) ||
            (recipe.ingredients && recipe.ingredients.some(function(ing) { 
              return ing.toLowerCase().includes(lowerCaseTerm)
            }))

          // Filter matching
          const matchesIngredients = filters.ingredients.length === 0 || 
            (recipe.ingredients && recipe.ingredients.some(function(ing) { 
              return filters.ingredients.some(function(filterIng) { 
                return ing.toLowerCase().includes(filterIng.toLowerCase())
              })
            }))

          const matchesPrepTime = !filters.maxPrepTime || 
            (recipe.prepTime && recipe.prepTime <= filters.maxPrepTime)

          const matchesDifficulty = !filters.difficulty || 
            recipe.difficulty === filters.difficulty

          return matchesSearch && matchesIngredients && matchesPrepTime && matchesDifficulty
        })
      },

      // Recipe CRUD Operations
      setRecipes: function(newRecipes) { set({ recipes: newRecipes }) },
      addRecipe: function(newRecipe) {
        set(function(state) {
          return {
            recipes: [...state.recipes, {
              ...newRecipe,
              id: Date.now(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }]
          }
        })
      },
      deleteRecipe: function(recipeId) {
        set(function(state) {
          return {
            recipes: state.recipes.filter(function(recipe) { 
              return recipe.id !== recipeId 
            })
          }
        })
      },
      updateRecipe: function(updatedRecipe) {
        set(function(state) {
          return {
            recipes: state.recipes.map(function(recipe) {
              return recipe.id === updatedRecipe.id 
                ? { 
                    ...updatedRecipe, 
                    updatedAt: new Date().toISOString() 
                  } 
                : recipe
            })
          }
        })
      },
      getRecipe: function(recipeId) {
        return get().recipes.find(function(recipe) { 
          return recipe.id === recipeId 
        })
      },

      // Initialize with sample data
      initializeSampleRecipes: function() {
        const sampleRecipes = [
          {
            id: 1,
            title: "Classic Margherita Pizza",
            description: "Simple and delicious pizza with tomato sauce, fresh mozzarella, and basil.",
            ingredients: ["pizza dough", "tomato sauce", "fresh mozzarella", "basil leaves"],
            prepTime: 30,
            difficulty: "Medium",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            title: "Chocolate Chip Cookies",
            description: "Soft and chewy cookies with melty chocolate chips.",
            ingredients: ["flour", "butter", "sugar", "eggs", "chocolate chips"],
            prepTime: 45,
            difficulty: "Easy",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
        set({ recipes: sampleRecipes })
      }
    }),
    {
      name: 'recipe-storage',
      storage: createJSONStorage(function() { return localStorage }),
      partialize: function(state) { return { recipes: state.recipes } }
    }
  )
)

export default useRecipeStore