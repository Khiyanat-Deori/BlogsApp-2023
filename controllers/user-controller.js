import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUser= async(req, res, next)=> {
    let users;
    try{
        users= await User.find();
    }
    catch(err){
        return console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No Users found"});
    }
    return res.status(200).json({users});

};

export const signup = async (req, res, next)=>{
    const {name, email, password}=req.body;

    let existingUser;

    try{
        existingUser= await User.findOne({email});
    }
    catch(err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User Already exists, Please login!"});
    }
    const hashedPassword= bcrypt.hashSync(password);
    const user= new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });
       

    try{
       await user.save();
    }
    catch(err){
        return console.log(err);
    }
    return res.status(201).json({user});
};

export const login=async (req, res, next)=>{
    const {email, password}=req.body;
    let existingUser;

    try{
        existingUser= await User.findOne({email});
    }
    catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message:"Couldn't find user by this email!"});
    }
    const isPasswordCorrect= bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password!"});
    }
    return res.status(200).json({user: existingUser});
    // message: "Login succesfull", 
}
export const getUserById = async (req, res, next) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  };