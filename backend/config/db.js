import mongoose from 'mongoose';


const connectDB = () => {

    try {
        
        const conn = mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected`.bgGreen);

    } catch (e) {
        
        console.log(`MongoDB connection error: ${e}`.bgRed);
    }
}


export default connectDB;