import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to our website!</p>
      <h2>Blog Posts</h2>
      <ul>
        <li><Link to="/blog/1">First Post</Link></li>
        <li><Link to="/blog/2">Second Post</Link></li>
        <li><Link to="/blog/3">Third Post</Link></li>
      </ul>
    </div>
  );
};

export default Home;