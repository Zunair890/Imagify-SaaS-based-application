import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const registerUser = async (req, res) => {
    try {
       
        const { name, email, password } = req.body;
        console.log(req.body)
        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            
            return res.json({
                success: false,
                message: "Missing Detailsss",
                
            });

           
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        // Save user to database
        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const loginUser= async(req,res)=>{
    try{
      const {email,password}= req.body;
      const user= await userModel.findOne({email})
      if(!user){
        return res.json({
            success:false,message:"User not exist"
        })
    }
        const isMatch= await bcrypt.compare(password,user.password)
        if(isMatch){
          const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
          res.json({
            success:true,token,
            message:"User logs in",
            user:{name:user.name}
          })
        }
        else{
          return res.json({
            success:false,
            message:"Invalid Credentials"
          })
        }
      
    }
    catch(error){
        console.log(error)
        res.json({
           success:false,
           message: error.message
        })
       }

}

export const userCredits= async (req,res)=>{
    try{
        const {userId}= req.body;
        const user= await userModel.findById(userId)
        res.json({
            success:true,
            credits: user.creditBalance,
            user: {name:user.name}
        })
    }
    catch(error){
        res.json({
            success:false,
            message:error.message
        })
    }
}


