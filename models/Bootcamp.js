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
    averageRating: {
        type: Number,
        min: [1, "Rating Must be at least 1"],
        max: [10, "Rating can not be more than 10"]
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no_photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

// Cascade delete courses when a bootcamp is deleted
// BootcampSheema.pre('remove', async function(next) {
//     console.log(`Courses being removed from bootcamp ${this._id}`);
//     await this.model('Course').deleteMany({ bootcamp: this._id });
//     next();
//   });

// Define a pre-remove middleware for the Bootcamp schema
BootcampSheema.pre('remove', async function (next) {
    const bootcampId = this._id;
  
    try {
      // Remove all associated courses when a bootcamp is removed
      await Course.deleteMany({ bootcamp: bootcampId });
      next();
    } catch (err) {
      next(err);
    }
  });

//Reverse populate with virtuals
BootcampSheema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false
})

export const Bootcamp = mongoose.model('Bootcamp', BootcampSheema);
