function UserProfile() {
  return (
    <div className="bg-gray-100 p-4 sm:p-4 md:p-6 lg:p-8 max-w-xs sm:max-w-sm mx-auto my-10 sm:my-16 md:my-20 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-800 my-3 sm:my-4 hover:text-blue-500 transition-colors duration-300">
        John Doe
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;