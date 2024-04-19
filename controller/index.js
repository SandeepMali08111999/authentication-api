import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();
import jwt from "jsonwebtoken"; ;
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Omit the password field from the response
    savedUser.password = undefined;

    // Respond with success message and user data (with password field omitted)
    return res
      .status(200)
      .json({ message: "User registered successfully.", data: savedUser });
  } catch (error) {
    return res.status(500).json({ message: "error", error });
  }
};

export const loginUser = async (req, res) => {
    try {
      // Find user by email
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        // If user not found, return 401 Unauthorized
        return res.status(401).json({ message: "Authentication failed. Invalid email or password." });
      }
  
      // Compare password
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        // If password is invalid, return 401 Unauthorized
        return res.status(401).json({ message: "Authentication failed. Invalid email or password." });
      }
  
      // If email and password are valid, generate JWT token
      const tokenObj = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      };
  
      // Sign JWT token with secret and set expiration time
      const jwtToken = jwt.sign(tokenObj, process.env.SECRET, { expiresIn: "4h" });
  
      // Send JWT token and user data back to client
      return res.status(200).json({ jwtToken, user: tokenObj });
    } catch (error) {
   
      
      return res.status(500).json({ message:"error",error });
    }
  };

  export const getUser=async(req,res)=>{
    try {
        const users=await userModel.find({},{password:0});
        return res.status(200).json({ data:users});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." }); 
    }
  }