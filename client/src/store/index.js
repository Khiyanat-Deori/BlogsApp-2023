// import {configureStore, createSlice} from '@reduxjs/toolkit';

// const loginSlice= createSlice({
//     name:"login",
//     initialState:{isLoggedIn: false},
//     reducers:{
//         login(state){
//             state.isLoggedIn=true
//         },
//         logout(state){
//             localStorage.removeItem("userId");
//             state.isLoggedIn=false
//         },
//     },

// });

// export const loginActions =loginSlice.actions;

// export const store=configureStore({
//     reducer: loginSlice.reducer
// },window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import { configureStore, createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    user: null, // Add user property to store user information
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user; // Store user information
    },
    logout(state) {
      localStorage.removeItem('userId');
      state.isLoggedIn = false;
      state.user = null; // Clear user information on logout
    },
  },
});

export const loginActions = loginSlice.actions;

export const store = configureStore(
  {
    reducer: loginSlice.reducer,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

