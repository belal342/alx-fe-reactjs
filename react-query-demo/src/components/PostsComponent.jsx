import { useQuery } from '@tanstack/react-query';
import React from 'react';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const { 
    data, 
    error, 
    isLoading, 
    isError, 
    refetch, 
    isFetching,
    isPreviousData 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5000, // Data is considered fresh for 5 seconds
    cacheTime: 60000, // Cache data for 1 minute
    refetchOnWindowFocus: true, // Refetch data when window gains focus
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      
      <button onClick={refetch} disabled={isFetching}>
        {isFetching ? 'Refreshing...' : 'Refresh Data'}
      </button>
      
      {isFetching && <div>Updating data...</div>}
      {isPreviousData && <div>Showing previous data while updating...</div>}
      
      <div style={{ marginTop: '20px' }}>
        <h3>Cache Information:</h3>
        <p>Data is cached for 1 minute (cacheTime: 60000ms)</p>
        <p>Data will refetch when window gains focus (refetchOnWindowFocus: true)</p>
        <p>Previous data is maintained during refetch (keepPreviousData: true)</p>
      </div>
      
      <ul style={{ marginTop: '20px' }}>
        {data.slice(0, 10).map(post => (
          <li key={post.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;