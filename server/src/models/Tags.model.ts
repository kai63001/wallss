import mongoose from 'mongoose';

const TagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

const Tags = mongoose.model('Tags', TagsSchema);

export default Tags;