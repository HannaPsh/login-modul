import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export default function HomePage() {
  const { user } = useContext(ThemeContext);
  if (user) {
    console.log(user);
  } else {
    console.log(user);
  }
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>Please login to view this content...</h1>
      )}
    </div>
  );
}
