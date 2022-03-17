import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import ProfilePage from '../Pages/ProfilePage';
import { ThemeContext } from '../ThemeContext';

export default function PrivateRoute() {
  const { user } = useContext(ThemeContext);
  return user ? <ProfilePage /> : <Navigate replace to="/" />;
}
