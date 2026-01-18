import User from "../model/UserModel.js"
import bcrypt from "bcryptjs"

export const Register = async(req, res, next)=>{
try {
    const {email, password} = req.body

    const checker = await User.findOne({email})

    if(checker){
return  console.log("User already exist")
    }


const hashedPassword = bcrypt.hashSync(password)
    const user = new User(
        {email, password : hashedPassword}

    )

    await user.save()

    res.status(200).json({
        success: true,
        message: "User created successfully"
})

} catch (error) {
    console.log(error);
    
}

}