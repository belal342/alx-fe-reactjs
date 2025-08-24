import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();
  
  // In a real app, you would fetch the post data based on postId
  const posts = {
    1: { title: 'First Post', content: 'This is the content of the first post.' },
    2: { title: 'Second Post', content: 'This is the content of the second post.' },
    3: { title: 'Third Post', content: 'This is the content of the third post.' },
  };
  
  const post = posts[postId];
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;