import mongoose from 'mongoose';
import mongoosePaginate  from 'mongoose-paginate-v2';

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
        type: String,
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

WallpaperSchema.plugin(mongoosePaginate);


const Wallpaper = mongoose.model('Wallpaper', WallpaperSchema);

export default Wallpaper;