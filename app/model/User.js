import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userScema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
  timestamps: true       // adds createdAt & updatedAt
});

export default model('User',userScema);