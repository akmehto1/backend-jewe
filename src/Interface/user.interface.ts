import { Document,Types} from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    isCheckedTC:boolean;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: 'admin' | 'user'; // Union type for role
    last_active: Date; // New field to track last active date
    level: number; // Level of the user
    userRefferalId:string; // Optional unique referral code for the user
    referredBy?: Types.ObjectId | null; // Reference to the user who referred (ObjectId)
}
