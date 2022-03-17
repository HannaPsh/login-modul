import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Navigate } from 'react-router';
import { ThemeContext } from '../ThemeContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return { ...state, loading: true };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loggedInUser: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case 'REGISTER_FAIL':
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
export default function RegisterPage() {
  const { user, setUser } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    success: false,
    loggedInUser: null,
  });
  const { loading, error, loggedInUser, success } = state;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
      return <Navigate replace to="/profile" />;
    }
  }, [loggedInUser]);
  if (user) {
    return <Navigate replace to="/profile" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); /* 
    localStorage.setItem(user, JSON.stringify(user)); */
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const { data } = await axios.post(`http://127.0.0.1:5000/users/`, {
        email,
        name,
        password,
        phone,
      });
      console.log('user' + user);
      console.log('loggedInUser:' + loggedInUser);
      console.log(data);
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'REGISTER_FAIL', payload: err.message });
    }
  };

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-item">
          <label>Name:</label>
          <input
            name="name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label>Phone:</label>
          <input
            name="phone"
            type="tel"
            required
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label> </label>
          <button>Register</button>
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
        {/* {success && (
          <div className="form-item">
            <label> </label>
            <span className="success">You are now registered!</span>
          </div>
        )} */}
      </form>
    </div>
  );
}
