import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import React, { useEffect, useState } from 'react';
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import {useDispatch, useSelector} from "react-redux";
import { loginActions } from "./store";
import SignUp from "./components/SignUp";
import axios from "axios";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const dispatch= useDispatch();
  const isLoggedIn= useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn);
  
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (userId) {
          const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
          const data = res.data;
          dispatch(loginActions.login({ user: data.user }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        // Set loading to false after fetching user data or encountering an error
        setLoading(false);
      }
    };

    // Call the fetchUser function
    fetchUser();
  }, [dispatch]);

  // Render loading state or your component based on the loading flag
  if (loading) {
    return <LoadingSpinner/>; // You can replace this with your loading indicator
  }
  

    
  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          {!isLoggedIn ?(<>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<Blogs/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          </>):(<>
          <Route path="/" element={<Blogs/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/blogs/add" element={<AddBlog/>}/>
          <Route path="/myBlogs" element={<UserBlogs/>}/>
          <Route path="/myBlogs/:id" element={<BlogDetail/>}/>{" "}</>)}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
