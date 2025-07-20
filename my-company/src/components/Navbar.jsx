import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center', // Added this property
      gap: '1rem'
    }}>
      <Link 
        to="/" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Home
      </Link>
      <Link 
        to="/about" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        About
      </Link>
      <Link 
        to="/services" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Services
      </Link>
      <Link 
        to="/contact" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Contact
      </Link>
    </nav>
  )
}

export default Navbar