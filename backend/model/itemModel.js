import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema = Schema({

    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model('items', itemSchema);

export default Item;