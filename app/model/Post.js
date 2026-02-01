import mongoose from "mongoose";

const schima = mongoose.Schema;

const postSchima = new schima({
    title:{
        type: String,
        reqtured: true
    },
    description:{
        type: String,
        reqtured: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    tag:{
        type: Object, // Plain object
        default: {}
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    cover:{
        type: String
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

export default mongoose.model('Post',postSchima);