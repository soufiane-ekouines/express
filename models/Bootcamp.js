import mongoose from "mongoose";

 const BootcampSheema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"],
        unique: [true, "the name must be unique"],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, "please add a description"],
        trim: true,
        maxlength: [500, 'descripion can not be more than 500 characters']
    },
    website: {
        type: String,
    },
    phone: {
        type: String,
        maxlength: [20, 'phone can not be more than 20 Number']
    },
    email: {
        type: String,
        // match: ['/^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/', "must type email"]
    },
    address: {
        type: String,
        required: [true, "address required"]
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        // Array of string
        type: [String],
        required: true,
        enum: [
            "Web Development",
            "UI/UX",
            "Mobile Development",
            "Data Science",
            "Business",
            "Other"
        ]
    },
    averageRating:{
        type: Number,
        min:[1,"Rating Must be at least 1"],
        max:[10,"Rating can not be more than 10"]
    },
    averageCost:Number,
    photo:{
        type: String,
        default: 'no_photo.jpg'
    },
    housing:{
        type: Boolean,
        default:false
    },  
    jobAssistance:{
        type: Boolean,
        default:false
    },  
    jobGuarantee:{
        type: Boolean,
        default:false
    },  
    acceptGi:{
        type: Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
});

export const Bootcamp = mongoose.model('Bootcamp', BootcampSheema);
