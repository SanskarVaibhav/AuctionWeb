import axios from 'axios';
import { setAlert } from './alertActions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from './types';

// Set Auth Token in axios headers if token exists
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth/user');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/register', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert('Invalid Credentials', 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  localStorage.removeItem('token');
  setAuthToken(null);
  dispatch({ type: LOGOUT });
};