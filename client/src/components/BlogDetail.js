import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const labelStyles= {mb:1,mt:2,fontSize:"24px", fontWeight:"bold", fontFamily:"cursive"};
const BlogDetail = () => {
  const navigate=useNavigate();
  const[blog,setBlog]=useState();
  const id= useParams().id;
  console.log(id);
  const [inputs, setInputs]=useState()

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const fetchDetails= async()=>{
    const res= await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err));
    const data= await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then(data=>{
      setBlog(data.blog);
      setInputs({title:data.blog.title, description:data.blog.description});
    });
  },[id]);
  const sendRequest= async()=>{
    const res= await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err));

    const data= await res.data;
    return data;
  }
  console.log(blog);
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=>console.log(data)).then(()=>navigate("/myBlogs/"));
  };

  return (
    <div>
      {inputs && (<form onSubmit={handleSubmit}>
        <Box border={3} borderColor={"#3f5efb #fc466b"} borderRadius={5} boxShadow={"10px 10px 20px #3f5efb"} padding ={3} margin={"auto"} 
        marginTop={3} display={"flex"}
        flexDirection={"column"} width={"80%"}>
          <Typography fontFamily={"cursive"}
          fontWeight={"bold"} padding={3} color={"grey"} variant='h2' textAlign={"center"}>Edit Your Blog!</Typography>
            
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField fontFamily={"cursive"} name="title" 
            onChange={handleChange}
            value={inputs.title}
            margin='normal' variant='outlined'/>
            
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField fontFamily={"cursive"} name="description" 
            onChange={handleChange}
            value={inputs.description} 
            margin='normal' variant='outlined'/>
            
            <Button sx={{fontFamily:"cursive",mt:2, borderRadius:4, background:'linear-gradient(90deg, rgba(252,70,107,1) 0%, rgba(63,94,251,1) 100%)'}} variant="contained" type='submit'>
              Submit
            </Button>
        </Box>
      </form>)}
    </div>
  )
}

export default BlogDetail