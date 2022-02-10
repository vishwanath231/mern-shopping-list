import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date ,
        default: Date.now
    }
});

const User = mongoose.model('users', UserSchema);

export default User;

