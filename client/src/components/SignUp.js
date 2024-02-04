import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate= useNavigate();
  const dispatch=useDispatch();
  const [inputs, setInputs]=useState({
    name:"", email:"", password:""
  })
  const [isLogin, setIsLogin]=useState(false);
  const [error, setError] = useState("");
  
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  // const sendRequest=async(type="signup")=>{
  //   const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
  //     name:inputs.name,
  //     email:inputs.email,
  //     password:inputs.password
  //   }).catch((err)=>console.log(err))

  //   const data= await res.data;
  //   console.log(data);
  //   return data;
  // }
  const sendRequest = async (type = "signup") => {
    try {
        const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        });

        const data = res.data;
        console.log(data);

        return { data, error: null };
    } catch (error) {
        console.error(error);

        // Extract error message from the response or set a generic one
        const errorMessage = error.response?.data?.message || "An error occurred.";

        return { data: null, error: errorMessage };
    }
};
  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   console.log(inputs);
  //   if(isLogin){
  //     sendRequest("login")
  //     .then((data)=>localStorage.setItem("userId", data.user._id))
  //     .then(()=>dispatch(loginActions.login()))
  //     .then(()=>navigate("/"));

  //   }else{
  //     sendRequest()
  //     .then((data)=>localStorage.setItem("userId", data.user._id))
  //     .then(()=>dispatch(loginActions.login()))
  //     .then(()=>navigate("/"));
      
  //   }
   
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await (isLogin ? sendRequest("login") : sendRequest());

    if (error) {
        // Display error message
        setError(error);
        console.error("Error:", error);
    } else {
        // Handle successful login/signup
        localStorage.setItem("userId", data.user._id);
        dispatch(loginActions.login({ user: data.user }));
        navigate("/");
    }
};
const handleTogglelogin = () => {
  setIsLogin(!isLogin);
  setError(''); // Reset the error state
}; 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}
        boxShadow={"10px 10px 20px #ccc"}
        padding={3}
        margin={'auto'}
        marginTop={5}
        borderRadius={5}
        maxWidth={400}>
          <Typography fontFamily="cursive" variant="h2" padding={3} textAlign={'center'}>
            {isLogin?"Login":"SignUp"}
          </Typography>
          
          {!isLogin&&<TextField name="name" onChange={handleChange} value={inputs.name} placeholder="Name" margin='normal'/>}
          
          <TextField  name="email" onChange={handleChange} value={inputs.email} type={'email'} placeholder="Email" margin='normal'/>
          
          <TextField name="password" onChange={handleChange} value={inputs.password} type={'password'} placeholder="Password" margin='normal'/>
          {/* Display error message if exists */}
{error && <Typography color="error">{error}</Typography>}
          <Button type='submit'variant ='contained' sx={{fontFamily:"cursive" ,marginTop:3, borderRadius:1, background:'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'}}>
            Submit
          </Button>
          
          <Button onClick={handleTogglelogin}
          variant ='contained' sx={{fontFamily:"cursive" ,marginTop:3, borderRadius:1, background:'linear-gradient(90deg, rgba(252,70,107,1) 0%, rgba(63,94,251,1) 100%)'}}>
            Change to {isLogin? "Signup":"Login"}
          </Button>
        
        </Box>      
      </form>
    </div>
  )
}

export default SignUp