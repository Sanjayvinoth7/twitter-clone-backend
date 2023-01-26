import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from './routes/users.js';
import authRoutes from './routes/auths.js';
import tweetRoutes from './routes/tweets.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors({origin : "*"}));

const port = process.env.PORT || 8000;

const connect = () => {
    mongoose.set("strictQuery",false);
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("connected to the mongo database")
    }).catch (err => {
        throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use('/api/users' ,userRoutes);
app.use('/api/auth' ,authRoutes);
app.use('/api/tweets',tweetRoutes);


app.listen(port, () => {
    connect();
    console.log(`listen to port ${port}`)
});
