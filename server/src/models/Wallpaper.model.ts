import mongoose from 'mongoose';

const WallpaperSchema = new mongoose.Schema({
    resolution: {
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
    }
})

const Wallpaper = mongoose.model('Wallpaper', WallpaperSchema);

export default Wallpaper;