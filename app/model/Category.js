import mongoose from "mongoose";

const schema = mongoose.Schema;

const categorySchema = new schema({
    title:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Category',categorySchema);