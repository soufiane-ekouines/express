import express from 'express';
import { config } from 'dotenv';


import morgan from 'morgan';
//Route files

import bootcamps from './routes/bootcamps.js';
//load env vars
config({ path: './config/config.env' });

const app = express();


// dev loggin middleware
if(process.env.NODE_ENV=="development")
{
    app.use(morgan('dev'));
}

//mount routers
app.use('/api/v1/bootcamps',bootcamps);

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log("server running in port " + process.env.NODE_ENV + "mode port " + PORT));