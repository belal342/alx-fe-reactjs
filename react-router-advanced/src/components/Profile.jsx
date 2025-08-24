import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  return (
    <div>
      <h1>Profile Page</h1>
      
      <nav>
        <ul>
          <li>
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
              Details
            </Link>
          </li>
          <li>
            <Link to="/profile/settings" className={location.pathname === '/profile/settings' ? 'active' : ''}>
              Settings
            </Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<ProfileDetails />} />
        <Route path="/settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};

export default Profile;