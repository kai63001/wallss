import mongoose from 'mongoose';

const WallpaperSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Wallpaper = mongoose.model('Wallpaper', WallpaperSchema);

export default Wallpaper;