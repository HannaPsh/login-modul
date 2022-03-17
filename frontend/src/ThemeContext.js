import { createContext, useState } from 'react';

const ThemeContext = createContext();
/* const lsUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null; */
const lsTheme = localStorage.getItem('theme')
  ? localStorage.getItem('theme')
  : 'light';
const lsLoggedIn = localStorage.getItem('loggedIn')
  ? localStorage.getItem('loggedIn')
  : false;
function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(lsTheme);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(lsLoggedIn);
  const handleLoginClick = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', loggedIn);
  };
  const handleLogoutClick = () => {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', false);
  };
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser,
        loggedIn,
        handleLoginClick,
        handleLogoutClick,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
export { ThemeContext, ThemeContextProvider };
