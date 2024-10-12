import mongoose from "mongoose";
import User from "../models/user/user.model";
import { findUserByEmailAndPhone } from "../service/auth.service";
import { comparePassword } from "../utlis/hashPassword";
import { signJWT } from "../utlis/jwt";
import { logger } from "../utlis/logger";
import { validateUserLoginSchema } from "../validtion/user/user.validation";
import express, { Request, response, Response } from "express";
import Plan from "../models/plan/plan";

const adminloginController = async (req: Request, resp: Response) => {
  // Schema validation
  const loginSchemaValidationResult = await validateUserLoginSchema(req.body);
  if (!loginSchemaValidationResult.isValid) {
    return resp
      .status(400)
      .json({ success: false, message: loginSchemaValidationResult.message });
  }

  try {
    // Find user by email
    const user: any = await findUserByEmailAndPhone(
      loginSchemaValidationResult.value.email,
    );





    // User not found
    if (!user) {
      return resp
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    // Check password
    // const isPasswordValid = await comparePassword(loginSchemaValidationResult.value.password, user.password);
    // if (!isPasswordValid) {
    //     return resp.status(403).json({ success: false, message: "admin Incorrect password" });
    // }

    // Create session
    const accessToken = signJWT({ ...user }, { expiresIn: "1d" });

    // Set the token in a cookie
    resp.cookie('accessToken', accessToken, {
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
  delete user.password;
  
  return resp.status(200).json({ success: true, message: "Login successful",user:{...user,accessToken:accessToken}});
  } catch (error) {
    logger.error(error); // Log the error for debugging
    return resp
      .status(400)
      .json({ success: false, message: "Admin Login failed" });
  }
};


const getAllUserData = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  try {
    // Parse query parameters with proper type casting
    const page: number = parseInt(req.query.page as string) || 0;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const sort: string = (req.query.sort as string) || "_id";
    const order: number = parseInt(req.query.order as string) || -1; // 1 for ascending, -1 for descending
    const filter: string = (req.query.filter as string) || "";
    const search: string = (req.query.search as string) || "";
    const day: string = req.query.day as string || ''; // Date filter

    // Create a filter object
    let query: any = {};

    // If there's a filter or search term, add conditions to the query
    if (filter) {
      query.date= filter; // Example: filter by user role
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } }, // Case-insensitive search
        { lastName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }


    if (day) {
        const startOfDay = new Date(day);
        const endOfDay = new Date(startOfDay);
     
        endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day in UTC

        query.createdAt = {
          $gte: startOfDay,
          $lt: endOfDay
        };
      }
      

    // Find all users, apply the query, sort, and pagination
    const allUserData = await User.find(query)
      .sort({ [sort]: -1 }) // Sort by specified field
      .skip(page * limit) // Pagination
      .limit(limit)
      .select("-password -_id -email"); // Exclude certain fields

    // Get total count for pagination
    const totalUsers: number = await User.countDocuments(query);

    // Return the response with user data and pagination info
    return resp.status(200).json({
      success: true,
      message: "All user data",
      users: allUserData,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);

    // Handle any errors and return a 500 Internal Server Error
    return resp.status(500).json({
      success: false,
      message: "Failed to fetch user data",
      error: (error as Error).message,
    });
  }
};

const recentJoinUser = async (req: Request, resp: Response) => {
  try {
    const recentJoinUser = await User.find()
      .sort({ createdAt: -1 }) // Sort by creation date, descending
      .limit(10)
      .select("-password -_id -role -level -updatedAt"); // Exclude sensitive fields

    if (!recentJoinUser || recentJoinUser.length === 0) {
      return resp
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    return resp.status(200).json({ success: true, recentJoinUser });
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return resp
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const changecredentials = async (req: Request, resp: Response) => {};

const getUserDetailsByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Validate ID format
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format" });
    }

    const userData = await User.findById(id).select(
      "-password -_id -updatedAt"
    );

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User data", userDetails: userData });
  } catch (error) {
    console.error("Error fetching user details by ID:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



const userDetails=async (req:Request,resp:Response)=>{
  const id=req.params.id;
  calculateCommission(id);

//   const user=await User.findById(id).select("-password -_id -updatedAt");
//   if(!user)return resp.status(404).json({success:false,message:"User not found"});

  

// const plan=await Plan.find({member_id:id}).select('-createdAt -updatedAt -_id -member_id');


// //also we done downline query to check how much money he  earn;



  

// if(!plan)return resp.status(404).json({success:false,message:"User not select any plan"});
// return resp.status(200).json({success:true,message:"User details",userDetails:user,planDetails:plan,sales:"null"});

// return resp.status(200).json({success:true,message:"User details",userDetails:user});


}













const calculateCommission = async (userId:any) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const commissionRates = [0.15, 0.08, 0.05, 0.02, 0.01]; // Commission rates per level

    // Step 1: Fetch all downlines and their corresponding plans in one query
    const downlineData = await User.aggregate([
      {
        $match: { referredBy: userId } // Find all users referred by the current user (direct downline)
      },
      {
        $lookup: {
          from: 'Plan', // Plan collection (make sure the name is correct)
          localField: '_id',
          foreignField: 'member_id',
          as: 'plan'
        }
      },
      { $unwind: '$plan' }, // Flatten the plan array
      {
        $project: { // Only fetch required fields
          level: 1,
          'plan.amount': 1
        }
      }
    ]);

    // Step 2: Calculate commission based on levels and plans
    const totalCommission = downlineData.reduce((commission, downline) => {
      const levelDiff = downline.level - user.level;

      if (levelDiff > 0 && levelDiff <= 5) { // Ensure commission is applied only for valid levels
        const commissionRate = commissionRates[levelDiff - 1];
        return commission + downline.plan.amount * commissionRate;
      }
      return commission;
    }, 0);

    return totalCommission;

  } catch (error) {
    console.error('Error calculating commission:', error);
    throw error;
  }
};



export {
  adminloginController,
  getAllUserData,
  recentJoinUser,
  getUserDetailsByIdController,
};
