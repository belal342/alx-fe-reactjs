import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch the post data based on id
  const posts = {
    1: { title: 'First Post', content: 'This is the content of the first post.' },
    2: { title: 'Second Post', content: 'This is the content of the second post.' },
    3: { title: 'Third Post', content: 'This is the content of the third post.' },
  };
  
  const post = posts[id];
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Post ID: {id}</p>
    </div>
  );
};

export default BlogPost;