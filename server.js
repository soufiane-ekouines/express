import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import colors from 'colors'

//load env vars
config({ path: './config/config.env' });

// conncet to db
connectDB();

//Route files
import bootcamps from './routes/bootcamps.js';

const app = express();


// dev loggin middleware
if(process.env.NODE_ENV=="development")
{
    app.use(morgan('dev'));
}

//mount routers
app.use('/api/v1/bootcamps',bootcamps);

const PORT = process.env.PORT || 5000


const server = app.listen(PORT, console.log(`server running in port  ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`error : ${err.message}`.red.bold);

    server.close(()=>process.exit(1));
});