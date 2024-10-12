import mongoose, { Document, Schema, Types } from "mongoose"; // Correct imports

// Define the interface for the Plan schema
export interface IPlan extends Document {
    member_id: Types.ObjectId;  // Reference to the User model
    plan: 'Basic' | 'Pro' | 'Enterprise';  // Plan type (basic, pro, enterprise)
    amount:Number;
}

// Define the Plan schema
const planSchema: Schema<IPlan> = new mongoose.Schema({
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,immutable:true},  // Reference to User model
    plan: { type: String, enum: ['Basic', 'Pro', 'Enterprise'], required: true,immutable:true},  // Plan type
    amount:Number,
   
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create and export the Plan model
const Plan = mongoose.model<IPlan>('Plan', planSchema);

export default Plan;
