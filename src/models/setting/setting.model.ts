import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the Setting interface
interface ISetting extends Document {
  member_id: mongoose.Types.ObjectId; // Reference to the User model
  lastActive: Date;
  lastPayment?: Date;
  overdue: boolean;
  status: 'Active' | 'Blocked';
  Courses: {
    allow: boolean; // Indicates if courses are allowed
    date?: Date; // Optional date for when courses are allowed
  };
  additionalSettings: Map<string, string>; // Flexible user-defined settings
}

// Define the Setting schema
const settingSchema: Schema<ISetting> = new Schema({
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
    unique: true,
  },
  lastActive: {
    type: Date,
    default: Date.now, // Default to current date
  },
  lastPayment: {
    type: Date,
  },
  overdue: {
    type: Boolean,
    default: false, // Default to false (no overdue payments)
  },
  status: {
    type: String,
    enum: ['Active', 'Blocked'], // Allowed values
    default: 'Active', // Default status
  },
  Courses: {
    allow: {
      type: Boolean,
      default: false, // Default to not allowed
    },
    date: {
      type: Date,
      default: null, // Default to null if no date is set
    },
  },
  additionalSettings: {
    type: Map,
    of: String, // A map to allow dynamic user-defined settings (key-value pairs)
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Create and export the Setting model
const Setting: Model<ISetting> = mongoose.model<ISetting>('Setting', settingSchema);
export default Setting;
