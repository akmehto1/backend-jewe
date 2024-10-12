import express, {Request, Response} from 'express';
import { IUser } from '../Interface/user.interface';
import User from '../models/user/user.model';
import Setting from '../models/setting/setting.model';



// export const createUser = async (payload: IUser) => {
//   console.log(payload);
//     const user = await User.create(payload);
//     console.log(user);
//     // Optionally, you might want to create a default setting for this user right after creating them.
//     await createUserWithDefaultSetting(user._id);
  
//   };

  


  export const createUserWithDefaultSetting = async (userPayload: any) => {
    // Create the user
    const referralUserExist = await User.findOne({ userRefferalId: userPayload.referredBy });
    
    // If referral user exists, update userPayload.referredBy with their ObjectId, else set it to null
    userPayload.referredBy = referralUserExist ? referralUserExist._id : null;


    const user = await User.create(userPayload);
  
    // Create default settings for the new user
    const defaultSetting = {
      member_id: user._id, // Use the newly created user's ID
      lastActive: new Date(),
      overdue: false,
      blocked: false,
      additionalSettings: new Map([
        ['theme', 'light'], // Example default setting
        ['notifications', 'enabled'],
      ]),
    };
  
    // Create the setting
    await Setting.create(defaultSetting);
  
    return user; // Return the newly created user
  };






export const findUserByEmailAndPhone = async (email: string): Promise<any> => {
   
    const user = await User.findOne({ email}).lean().select('-__v -updatedAt');

    return  user; // Converts the user object to a boolean: true if found, false if not
};



// This returns true if no user is found and false if a user with the email exists, which simplifies the logic.
export const isUserNotRegistered = async (email: string, userRefferalId: string) => {
  return await User.findOne({ $or: [{ email: email }, { userRefferalId: userRefferalId }] });
};




export const createLoginSession=(email:string)=>{
     
}