import mongoose from 'mongoose';

const WallpaperSchema = new mongoose.Schema({
    resolution: {
        type: String,
    },
    name: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: String,
    }],
    author: {
        type: String
    },
    categoly: {
        type: String
    }
})

const Wallpaper = mongoose.model('Wallpaper', WallpaperSchema);

export default Wallpaper;