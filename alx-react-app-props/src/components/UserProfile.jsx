import { useContext } from 'react';
import UserContext from '../components/UserContext';

const UserProfile = (props) => {
  // Destructure props with default values for safety
  const { 
    name = '', 
    age = '', 
    bio = '',
    // Optional: Direct context access if needed later
    userData = useContext(UserContext) 
  } = props;

  return (
    <div style={{ 
      border: '1px solid #e0e0e0',
      padding: '16px',
      margin: '12px 0',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#1976d2',
        marginTop: 0,
        borderBottom: '1px solid #eee',
        paddingBottom: '8px'
      }}>{name}</h2>
      
      <p style={{ margin: '8px 0' }}>
        Age: <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>{age}</span>
      </p>
      
      <p style={{ 
        color: '#616161',
        fontStyle: 'italic',
        lineHeight: 1.5
      }}>
        {bio}
      </p>
    </div>
  );
};

export default UserProfile;