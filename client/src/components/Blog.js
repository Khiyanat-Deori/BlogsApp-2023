import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Blog = ({title, description, imageURL, userName, isUser, id, createdAt}) => {

  const refresh =()=>{
    window.location.reload(true);
  }
  const navigate= useNavigate();
  const handleEdit=()=>{
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest= async()=>{
    const res= await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  const handleDelete=()=>{
    deleteRequest();
  }
  
  const parsedDate = new Date(createdAt);
  const formattedDate = isNaN(parsedDate) ? 'Date not available' : parsedDate.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
  return (
    <div> <Card sx={{ width:"40%", margin:"auto", mt:2, padding:2, boxShadow:"5px 10px 15px #ccc", 
    "&:hover": {
        boxShadow:"10px 15px 25px #ccc",},
        }}>
       
      <CardHeader 
        avatar={
          <Avatar sx={{fontFamily:"cursive", background: 'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)' }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
        title={<b style={{fontFamily:"cursive", color:"#3e3e47"}}>{title}</b> }
        subheader={formattedDate}
      /> 
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
        <hr/>
        <br/>
        <Typography fontFamily="cursive" variant="body2" color="text.secondary">
          <b>{userName}</b>{": "}{description}
        </Typography>
      </CardContent>
      {isUser&&(
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><ModeEditOutlineIcon sx={{color:'#939ed6'}}/></IconButton>
          <IconButton onClick={()=>{handleDelete();refresh();}} ><DeleteForeverIcon sx={{color:'#939ed6'}}/></IconButton>
        </Box>
      )}  

    </Card></div>
  )
}

export default Blog