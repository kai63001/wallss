import mongoose from 'mongoose';

const WallpaperSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
})

const Wallpaper = mongoose.model('wallpapers', WallpaperSchema);

export default Wallpaper;