import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken'; 

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
})

// Sign JWT and return
UserSchema.methods.getsignedJwtToken = function () {
  return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  });
};

//match enteres user password to hashed password
UserSchema.methods.matchpassword = async function(Epassword) {
  return await bcrypt.compare(Epassword,this.password);
}

export const User = mongoose.model('User', UserSchema);

