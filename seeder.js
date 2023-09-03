import mongoose from "mongoose";

import fs from "fs";
// import { Colors } from "colors";
import dotenv from "dotenv";
import { Bootcamp } from "./models/Bootcamp.js";

dotenv.config({path:'./config/config.js'})


//connect with db
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    useUnifiedTopology:true
});

// Read JSON files
const Bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));

//import to db
const importdata = async () =>{
    try {
        await Bootcamp.create(Bootcamps);
        console.log("data imported".green.inverse);
        process.exit();
    } catch (err) {
        console.log("data not imported".green.red);
        console.error(err);
        
    }
}

//delete data
const deletetdata = async () =>{
    try {
        await Bootcamp.deleteMany();
        console.log("data deleted".green.inverse);
        process.exit();
    } catch (err) {
        console.log("data not deleted".green.red);
        console.error(err);
        
    }
}

if(process.argv[2]=== '-i')
{
    importdata();
}else if(process.argv[2]=== '-d')
{
    deletetdata();
}