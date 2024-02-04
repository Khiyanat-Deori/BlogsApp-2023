import React, { useState } from 'react';
import {AppBar, Button, Toolbar, Typography, Box} from '@mui/material';
import { Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginActions } from '../store';
import "../App.css";

const Header = () => {
    const dispatch= useDispatch();
    const isLoggedIn= useSelector((state)=>state.isLoggedIn);
    const user = useSelector((state) => state.user);
    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (<div>
        <AppBar position="sticky" sx={{background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'}}>
            <Toolbar>
                <Typography fontFamily={"cursive"} variant ="h4"><Link to ="/" style={{textDecoration:'none',color:'inherit'}}>BlogsApp</Link></Typography>
                {isLoggedIn&&(<Box fontFamily={"cursive"} display="flex" marginLeft={'auto'} marginRight={'auto'}>
                    <NavLink to="/" style={{textDecoration:'none',marginRight:'20px',marginLeft:'20px'}}className={({isActive})=>(isActive?"link-active":"link")}>ALL BLOGS</NavLink>
                    <NavLink to="/myBlogs" style={{textDecoration:'none',marginRight:'20px',marginLeft:'20px'}}className={({isActive})=>(isActive?"link-active":"link")}>MY BLOGS</NavLink>
                    <NavLink to="/blogs/add" style={{textDecoration:'none',marginLeft:'20px'}}className={({isActive})=>(isActive?"link-active":"link")}>ADD BLOG</NavLink>
                </Box>)}
                <Box display="flex" marginLeft='auto'>
                    {!isLoggedIn&&(<>{" "}<Button LinkComponent={Link} to="/login" variant ='contained' sx={{fontFamily:"cursive",margin:1, borderRadius:1, background:'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',color: activeButton === 'login' ? '#939ed6':'white'  }}
                    onClick={() => handleButtonClick('login')}>
                        Login
                    </Button>

                    <Button LinkComponent={Link} to="/signup" variant ='contained' sx={{fontFamily:"cursive",margin:1, borderRadius:1, background:'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',color: activeButton === 'signup' ?'#939ed6':'white'}}
                    onClick={() => handleButtonClick('signup')}>
                        SignUp
                    </Button></>)}

                    {isLoggedIn&&(<>
                        <Typography variant="h6" sx={{ fontFamily: "cursive", margin: 1, color: 'white' }}>
            Welcome, {user.name}!
          </Typography>    
                    <Button onClick={()=>dispatch(loginActions.logout())}
                    LinkComponent={Link} to="/login" variant ='contained' sx={{fontFamily:"cursive",margin:1, borderRadius:1, background:'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'}}>
                        Logout 
                    </Button></>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
        
        
        </div>
    );
};

export default Header;