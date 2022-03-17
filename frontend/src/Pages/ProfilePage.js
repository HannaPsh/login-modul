import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Navigate } from 'react-router';
import { ThemeContext } from '../ThemeContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loading: true };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        updatedUser: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case 'UPDATE_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export default function ProfilePage() {
  const { user, setUser } = useContext(ThemeContext);
  const { handleLogoutClick } = useContext(ThemeContext);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    updatedUser: null,
    error: '',
    success: false,
  });
  const { loading, error, updatedUser, success } = state;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (!user) {
      return <Navigate replace to="/" />;
    } else if (updatedUser) {
      setUser(updatedUser);
      return <Navigate replace to="/" />;
    } else {
      setEmail(user.email);
      setName(user.name);
      setPhone(user.phone);
      setPassword(user.password);
    }
  }, [user]);

  const logOutFunction = () => {
    setUser(null);
    handleLogoutClick();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_REQUEST' });
    try {
      const res = await fetch(`http://127.0.0.1:5000/users/${user._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...user, email, name, password, phone }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const updatedUser = await res.json();
      console.log(user);
      console.log(updatedUser);

      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: updatedUser,
      });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: err.message });
    }
  };
  if (!user) {
    return <Navigate replace to="/" />;
  }
  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-item">
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label>Phone:</label>
          <input
            name="phone"
            type="tel"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label> </label>
          <button>Update</button>
        </div>
        <div className="form-item">
          <label> </label>
          <button onClick={logOutFunction} type="button">
            Logout
          </button>
        </div>
        {loading && (
          <div className="form-item">
            <label> </label>
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className="form-item">
            <label> </label>
            <span className="error">{error}</span>
          </div>
        )}
        {success && (
          <div className="form-item">
            <label> </label>
            <span className="success">Profile updated successfully.</span>
          </div>
        )}
      </form>
    </div>
  );
}
