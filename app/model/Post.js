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
        type: Number
    },
    tag:{
        type: Object, // Plain object
        default: {}
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