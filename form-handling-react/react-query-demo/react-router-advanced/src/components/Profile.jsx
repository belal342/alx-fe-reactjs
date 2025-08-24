import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  const location = useLocation();
  
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