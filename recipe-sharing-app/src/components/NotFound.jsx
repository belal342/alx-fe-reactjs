import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">
        Go to Home
      </Link>
    </div>
  )
}

export default NotFound