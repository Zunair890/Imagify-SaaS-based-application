import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    creditBalance: {
        type: Number,
        default: 5
    }
});

// Ensure the model isn't redefined (useful for serverless environments)
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
