import axios from 'axios';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const ADD_USER_START = 'ADD_USER_START';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';

export const getUsers = () => dispatch => {
  dispatch({ type: FETCH_USERS_START });
  axios()
    .get('https://localhost:4000')
    .then(res => {
      dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_USERS_FAIL, payload: err.message });
    });
};

export const addUser = (e, newuser) => dispatch => {
  e.preventDefault();
  dispatch({ type: ADD_USER_START });
  return axios
    .post('https://localhost:4000/api/users', newuser)
    .then(res => {
      dispatch({ type: ADD_USER_SUCCESS });
      axios()
        .get('https://localhost:4000')
        .then(res => {
          dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data });
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: FETCH_USERS_FAIL, payload: err.message });
        });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ADD_USER_FAIL, payload: err.message });
    });
};

export const deleteUser = id => dispatch => {
  dispatch({ type: DELETE_USER_START });
  axios()
    .delete(`https://localhost:4000/api/users/${id}`)
    .then(res => {
      dispatch({ type: DELETE_USER_SUCCESS });
      axios()
        .get('https://localhost:4000')
        .then(res => {
          dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: res.data
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: FETCH_USERS_FAIL,
            payload: err.message
          });
        });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_USER_FAIL, payload: err });
    });
};

export const updateUser = (id, updatedUser) => dispatch => {
  dispatch({ type: UPDATE_USER_START });
  axios()
    .put(`https://localhost:4000/api/users/${id}`, updatedUser)
    .then(res => {
      dispatch({ type: UPDATE_USER_SUCCESS });
      axios()
        .get('https://localhost:4000')
        .then(res => {
          dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: res.data
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: FETCH_USERS_FAIL,
            payload: err.message
          });
        });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: UPDATE_USER_FAIL, payload: err });
    });
};
