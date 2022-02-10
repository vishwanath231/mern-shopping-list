import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRouter.js';
import path from 'path';


// Config Path
dotenv.config();


// Initial Express App
const app = express();

// MongoDB connection
connectDB();

// Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("tiny"));
}

// CORS - Cross Origin Resource Sharing
app.use(cors());

// Express Middleware
app.use(express.json());


// Routes
app.use('/api/auth', authRouter);


// Heroku deployment

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}else{

    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

// PORT
const PORT = process.env.PORT || 5000;

// App listen
app.listen(
    PORT,
    console.log(`Server running an ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.bgYellow)
)