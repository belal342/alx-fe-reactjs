import React from 'react'
import useRecipeStore from '../store/recipeStore'

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm)
  const searchTerm = useRecipeStore(state => state.searchTerm)

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name, description, or ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar