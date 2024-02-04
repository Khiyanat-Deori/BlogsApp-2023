import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const labelStyles= {mb:1,mt:2,fontSize:"24px", fontWeight:"bold", fontFamily:"cursive"};
const AddBlog = () => {
  
  const navigate=useNavigate();
  const [inputs, setInputs]=useState({
    title:"", description:"", imageURL:""
  })

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const sendRequest=async()=>{
    const res = await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch((err)=>console.log(err))

    const data= await res.data;
    return data;
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data))
    .then(()=>navigate("/"));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor={"#3f5efb #fc466b"} borderRadius={5} boxShadow={"10px 10px 20px #3f5efb"} padding ={1} margin={"auto"} 
        marginTop={3} display={"flex"} marginBottom={3}
        flexDirection={"column"} width={"60%"}>
          <Typography fontFamily={"cursive"}
          fontWeight={"bold"} padding={3} color={"grey"} variant='h2' textAlign={"center"}>Post Your Blog!</Typography>
            
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField  name="title" 
            onChange={handleChange}
            value={inputs.title}
            margin='normal' variant='outlined'/>
            
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField fontFamily={"cursive"} name="description" 
            onChange={handleChange}
            value={inputs.description} 
            margin='normal' variant='outlined'/>
            
            <InputLabel sx={labelStyles}>ImageURL</InputLabel>
            <TextField fontFamily={"cursive"} name="imageURL" 
            onChange={handleChange}
            value={inputs.imageURL}
            margin='normal' variant='outlined'/>
            
            <Button sx={{mt:2, borderRadius:4, background:'linear-gradient(90deg, rgba(252,70,107,1) 0%, rgba(63,94,251,1) 100%)', fontFamily:"cursive" }} variant="contained" type='submit'>
              Submit
            </Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog