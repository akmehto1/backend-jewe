import express, { Request, Response } from "express";
import User from "../models/user/user.model";
import Plan from "../models/plan/plan";
import mongoose from "mongoose";
import Transaction from "../models/transactions/transaction.model";
import Setting from "../models/setting/setting.model";
import { planPrices } from "../config/price";

const getUserDetails = async (req: any, resp: Response) => {
  const UserData = await User.findById(req.user._id).select(
    "-password -_id -email"
  );
  return resp
    .status(200)
    .json({ success: true, message: "All user data", users: UserData });
};










const checkPlan = async (req: any, resp: Response) => {
  console.log(req.user);
  try {
    // Check if user_id is defined
    if (!req.user || !req.user._id) {
      return resp
        .status(400)
        .json({ success: false, message: "User ID is undefined" });
    }

    // Find the user's plan by member_id
    const userPlan = await Plan.findOne({ member_id: req.user._id });

    // If no plan is found, return a 404 response
    if (!userPlan) {
      return resp
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    // If plan is found, return it in the response
    return resp.status(200).json({ success: true, plan: userPlan });
  } catch (error: any) {
    console.error("Error checking user plan:", error);
    // Handle any potential errors during database query
    return resp.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// Commission Controller
const Commission = async (req:any, resp: Response) => {
  const id = req.user._id;  // Assuming req.user contains the authenticated user's info

  try {
    const CA = await calculateCommission(id); // Add await to handle the async function
    return resp.status(200).json({ success: true, value: CA });
  } catch (error) {
    console.error("Error calculating commission:", error);  // Log the error for debugging
    return resp.status(400).json({ success: false, message: "Error calculating commission" });
  }
};

const getDownline:any = async (userId: string) => {
  // Find all users referred by the current user (direct downline)
  const downlineMembers = await User.find({ referredBy: userId });

  // Recursively get downlines for each member
  const promises = downlineMembers.map(member => getDownline(member._id));
  const nestedDownlines = await Promise.all(promises);

  // Flatten the array to return a single list of downline members
  return downlineMembers.concat(...nestedDownlines);
};

const calculateCommission = async (userId:any) => {
  try {
    const member = await User.findById(userId);
    if (!member) {
      throw new Error('Member not found');
    }

    const downlines = await getDownline(userId);
    
    const commissionRates = [0.15, 0.08, 0.05, 0.02, 0.01]; // Commission rates per level
  
    let totalCommission = 0;

    
    
    for (const downline of downlines) {
      const levelDiff = downline.level - member.level;
  
      if (levelDiff > 0 && levelDiff <= 5) { // Apply commission rates up to level 5
        const transactions = await Transaction.find({ member_id: downline._id });
        const totalSales = transactions.reduce((sum, t) => sum + t.amount, 0);
  
        totalCommission += totalSales * commissionRates[levelDiff - 1];
      }
    }
  
    return totalCommission;
  } catch (error) {
    console.error('Error calculating commission:', error);
    throw error; // Re-throw the error after logging it
  }
};

// Calculate Commission Function
// const calculateCommission = async (userId: string) => {
//   try {
//     const user = await User.findById(userId);
    
//     if (!user) throw new Error('User not found');

//     const commissionRates = [0.15, 0.08, 0.05, 0.02, 0.01]; // Commission rates per level

//     // Step 1: Fetch all downlines and their corresponding plans in one query
//     const downlineData = await User.aggregate([
//       {
//         $match: { referredBy: userId } // Find all users referred by the current user (direct downline)
//       },
//       {
//         $lookup: {
//           from: 'plans', // Ensure 'plans' is the correct name of the Plan collection
//           localField: '_id',
//           foreignField: 'member_id',
//           as: 'plan'
//         }
//       },
//       { $unwind: '$plan' }, // Flatten the plan array
//       {
//         $project: { // Only fetch required fields
//           level: 1,
//           'plan.amount': 1
//         }
//       }
//     ]);

//     // Step 2: Calculate commission based on levels and plans
//     const totalCommission = downlineData.reduce((commission, downline) => {
//       const levelDiff = downline.level - user.level;

//       if (levelDiff > 0 && levelDiff <= 5) { // Ensure commission is applied only for valid levels
//         const commissionRate = commissionRates[levelDiff - 1];
//         return commission + downline.plan.amount * commissionRate;
//       }
//       return commission;
//     }, 0);

//     return totalCommission;

//   } catch (error) {
//     console.error('Error calculating commission:', error);
//     throw new Error('Commission calculation failed');
//   }
// };


const buyPlan = async (req: any, resp: Response) => {
  // let session = await mongoose.startSession();
  // session.startTransaction();

  const referredBY=req.user.referredBy;
  const userId = req.user._id;



  console.log(req.user.referredBy);



  

  
     

 
  
  

  


  try {
    // Check if user ID is provided
    if (!req.user || !req.user._id) {
      return resp
        .status(400)
        .json({ success: false, message: "User ID is undefined" });
    }

    // Extract the plan type from the request body
    const { plan,amount} = req.body;
    console.log(plan,amount);

    // Validate the incoming data
    if (!plan || !["Basic", "Pro", "Enterprise"].includes(plan)) {
      return resp
        .status(400)
        .json({ success: false, message: "Invalid plan type" });
    }

    // Check if the user already has an active plan
    const existingPlan = await Plan.findOne({member_id: req.user._id});

    if (existingPlan) {
      return resp
        .status(400)
        .json({ success: false, message: "User already has this plan" });
    }

    // if(amount!=planPrices.basic.price)return resp.status(400).json({success:false,message:"Invalid plan Price"});


    // Create a new plan document
    const newPlan = new Plan({
      member_id: req.user._id, // Set member_id to the user's ID
      plan, // Set the selected plan type
      amount
    });

    // Save the new plan document to the database
    await newPlan.save();

    

    ///dummy transaction
    const newTransaction = new Transaction({
      member_id: req.user._id,
      type: "debit",
      amount:amount, // Get the plan price from the database
      date: new Date(),
      status: "completed",
      description: `Purchased ${plan} plan`,
      payment_method: "credit_card",
      transaction_ref: "r1",
    });

    await newTransaction.save();

    let newLevel=req.user.level;
  
 
    const uplineMember = await User.findOne({_id:req.user.referredBy});
    
    
    newLevel=uplineMember?uplineMember.level+1:newLevel;

    console.log("new level",newLevel);
    console.log("upline member",uplineMember);







    // Update the user's settings to add the new plan to additionalSettings
    // const key = "currentPlan"; // Specify the key for additionalSettings
    // const value = plan; // Set the value to the new plan type

    const updatedSetting = await Setting.findOneAndUpdate(
      { member_id: req.user._id }, // Find the setting by user ID
      {
          $set: {
            'Courses.allow': true, // Set allow to true
            'Courses.date': new Date(), // Set the current date
          }
      },
      { new: true, useFindAndModify: false } // Return the updated document
    );

    const updatedUser=await User.findOneAndUpdate(
      {_id:userId},
      {
        $set:{
          level:newLevel,
        }
      },
      {new:true,useFindAndModify:false}
    );


    // if (!updatedSetting) {
    //   console.log("Setting document not found for this user.");
    //   return resp.status(404).json({
    //     success: false,
    //     message: "Setting document not found for this user.",
    //   });
    // }

    // // Store the current plan in the session
    // req.session.currentPlan = plan;

    //chnage in setting not user have permission to access courses;

    // // Return success response
    // await session.commitTransaction();

    return resp.status(201).json({ success: true, plan: newPlan });
  } catch (error: any) {
    console.error("Error buying plan:", error);
    // Handle any potential errors
    return resp.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};




const userJustOneLevelDown=async(req:any,resp:Response)=>{
  const id=req.user._id;

  try{
    const allUser=await User.find({referredBy:id}).select('-referredBy -last_active -_id -password -phone -role -level -userRefferalId -createdAt -updatedAt -isCheckedTC');
    console.log(allUser);

    if(allUser.length==0)return resp.status(200).json({success:false,message:"No user found"});
 
    return resp.status(200).json({success:false,allUser:allUser});

  }catch(error:any){
    return resp.status(404).json({success:false,message:error.message});
  }
  
  
  

}



export { getUserDetails, buyPlan, checkPlan,Commission,userJustOneLevelDown};
