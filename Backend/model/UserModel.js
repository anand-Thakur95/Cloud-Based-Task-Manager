import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    email:{
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

})

const User = mongoose.model('User', userSchema, 'users')

export default User;