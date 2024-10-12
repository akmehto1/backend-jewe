import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../../Interface/user.interface';
import crypto from 'crypto';
import { boolean } from 'joi';

// Create the user schema
const userSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: true,
 
  },
  lastName:{
    type: String,
    required: true,
 
  },
  phone: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
   
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    
  },
  last_active: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: Number,
    default: 1,
  },
  userRefferalId:{
    type: String,
  
    unique: true, // Ensure the referral code is unique
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    default: null,
  },
  isCheckedTC:{
    type: Boolean,
    default:true,
   
  }
},{timestamps:true});



// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User; // Export the User model as default
