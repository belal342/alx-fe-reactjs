import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      favorites: [],
      recommendations: [],
      searchTerm: '',
      filters: {
        ingredients: [],
        maxPrepTime: null,
        difficulty: null
      },

      // Search and Filter Actions
      setSearchTerm: (term) => set({ searchTerm: term }),
      setFilters: (newFilters) => set({ filters: { ...get().filters, ...newFilters } }),
      resetFilters: () => set({ 
        searchTerm: '',
        filters: {
          ingredients: [],
          maxPrepTime: null,
          difficulty: null
        }
      }),

      // Computed filtered recipes
      get filteredRecipes() {
        const { recipes, searchTerm, filters } = get()
        const lowerCaseTerm = searchTerm.toLowerCase()
        
        return recipes.filter(recipe => {
          // Search term matching
          const matchesSearch = searchTerm === '' || 
            recipe.title.toLowerCase().includes(lowerCaseTerm) ||
            recipe.description.toLowerCase().includes(lowerCaseTerm) ||
            (recipe.ingredients && recipe.ingredients.some(ing => 
              ing.toLowerCase().includes(lowerCaseTerm)))

          // Filter matching
          const matchesIngredients = filters.ingredients.length === 0 || 
            (recipe.ingredients && recipe.ingredients.some(ing => 
              filters.ingredients.some(filterIng => 
                ing.toLowerCase().includes(filterIng.toLowerCase())
              )))

          const matchesPrepTime = !filters.maxPrepTime || 
            (recipe.prepTime && recipe.prepTime <= filters.maxPrepTime)

          const matchesDifficulty = !filters.difficulty || 
            recipe.difficulty === filters.difficulty

          return matchesSearch && matchesIngredients && matchesPrepTime && matchesDifficulty
        })
      },

      // Favorites Actions
      addFavorite: (recipeId) => set(state => ({
        favorites: [...state.favorites, recipeId]
      })),
      removeFavorite: (recipeId) => set(state => ({
        favorites: state.favorites.filter(id => id !== recipeId)
      })),
      toggleFavorite: (recipeId) => set(state => {
        const isFavorite = state.favorites.includes(recipeId)
        return {
          favorites: isFavorite
            ? state.favorites.filter(id => id !== recipeId)
            : [...state.favorites, recipeId]
        }
      }),
      isFavorite: (recipeId) => get().favorites.includes(recipeId),

      // Recommendations
      generateRecommendations: () => {
        const { recipes, favorites } = get()
        if (favorites.length === 0) {
          set({ recommendations: [] })
          return
        }
        
        // Get tags from favorite recipes
        const favoriteTags = recipes
          .filter(recipe => favorites.includes(recipe.id))
          .flatMap(recipe => recipe.tags || [])
        
        // Count tag occurrences
        const tagCounts = favoriteTags.reduce((acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1
          return acc
        }, {})

        // Recommend recipes with similar tags that aren't already favorites
        const recommended = recipes
          .filter(recipe => {
            if (favorites.includes(recipe.id)) return false
            
            const recipeTags = recipe.tags || []
            return recipeTags.some(tag => tagCounts[tag])
          })
          .sort((a, b) => {
            // Sort by number of matching tags
            const aTags = a.tags || []
            const bTags = b.tags || []
            const aScore = aTags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0)
            const bScore = bTags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0)
            return bScore - aScore
          })
          .slice(0, 5) // Top 5 recommendations
        
        set({ recommendations: recommended })
      },

      // Recipe CRUD Operations
      setRecipes: (newRecipes) => set({ recipes: newRecipes }),
      addRecipe: (newRecipe) => set(state => ({
        recipes: [...state.recipes, {
          ...newRecipe,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),
      deleteRecipe: (recipeId) => set(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
      })),
      updateRecipe: (updatedRecipe) => set(state => ({
        recipes: state.recipes.map(recipe =>
          recipe.id === updatedRecipe.id 
            ? { 
                ...updatedRecipe, 
                updatedAt: new Date().toISOString() 
              } 
            : recipe
        )
      })),
      getRecipe: (recipeId) => get().recipes.find(recipe => recipe.id === recipeId),

      // Initialize with sample data
      initializeSampleRecipes: () => {
        const sampleRecipes = [
          {
            id: 1,
            title: "Classic Margherita Pizza",
            description: "Simple and delicious pizza with tomato sauce, fresh mozzarella, and basil.",
            ingredients: ["pizza dough", "tomato sauce", "fresh mozzarella", "basil leaves"],
            prepTime: 30,
            difficulty: "Medium",
            tags: ["italian", "vegetarian", "dinner"],
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
            tags: ["dessert", "baking", "snack"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            title: "Vegetable Stir Fry",
            description: "Quick and healthy vegetable stir fry with your choice of protein.",
            ingredients: ["bell peppers", "broccoli", "carrots", "soy sauce", "garlic"],
            prepTime: 20,
            difficulty: "Easy",
            tags: ["asian", "vegetarian", "quick"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
        set({ recipes: sampleRecipes })
      }
    }),
    {
      name: 'recipe-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        recipes: state.recipes,
        favorites: state.favorites
      }),
    }
  )
)

export default useRecipeStore