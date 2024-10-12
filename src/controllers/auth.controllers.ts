import { IUser } from "../Interface/user.interface";
import {
  createUserWithDefaultSetting,
  findUserByEmailAndPhone,
  isUserNotRegistered,
} from "../service/auth.service";
import { comparePassword, hashPassword } from "../utlis/hashPassword";
import { signJWT } from "../utlis/jwt";
import { logger } from "../utlis/logger";
import {
  validateUserLoginSchema,
  validateUserSignupSchema,
} from "../validtion/user/user.validation";

import express, { Request, Response } from "express";

const SignUpController = async (req: Request, resp: Response) => {
  console.log(req.body);

  logger.info("Sign-up route hit -------------------------------------------");

  // Validate incoming data
  const validationResult = validateUserSignupSchema(req.body);
  if (!validationResult.isValid) {
    console.log("validated false");
    return resp
      .status(400)
      .json({ success: false, message: validationResult.message });
  }

  try {
    // Disallow signup with the role 'admin'
    if (req.body.role === "admin") {
      // 403 Forbidden - Admin signup not allowed
      return resp
        .status(403)
        .json({ success: false, message: "Admin not allowed" });
    }

    

    // Check if email is already registered
    if (await isUserNotRegistered(req.body.email,req.body.userRefferalId)) {

      // 409 Conflict - email already in use
      console.log("email already exist or userID already in use");
      return resp
        .status(409)
        .json({
          success: false,
          message: "email already exist or userID already in use",
        });
    }

    // Hash the password
    req.body.password = hashPassword(req.body.password);
   

    // Signup process
    const user = await createUserWithDefaultSetting(req.body); // Make sure to await the createUser function

    logger.info("User sign up");

    // 201 Created - User successfully created
    return resp
      .status(201)
      .json({ success: true, message: "User signed up successfully" });
  } catch (error) {
    logger.error(error);

    // 500 Internal Server Error - General server error
    return resp.status(500).json({ success: false, message: "Server error" });
  }
};

const loginController = async (req: Request, resp: Response) => {
 

  // Schema validation
  const loginSchemaValidationResult = await validateUserLoginSchema(req.body);
  if (!loginSchemaValidationResult.isValid) {
    console.log("validate");
    return resp
      .status(400)
      .json({ success: false, message: loginSchemaValidationResult.message });
  }

  try {
    // Find user by email

    const user: any = await findUserByEmailAndPhone(loginSchemaValidationResult.value.email);

    // User not found
    if (!user) {
      return resp
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    
    
    if (user.role === "admin")
      return resp.status(400).json({ success: false, message: "No allow" });

    // Check password
    const isPasswordValid = await comparePassword(
      loginSchemaValidationResult.value.password,
      user.password
    );


    if (!isPasswordValid) {
      console.log("password not match");
      return resp
        .status(403)
        .json({ success: false, message: "Incorrect password" });
    }

    

    // Create session
    console.log(user);
    const accessToken = signJWT({ ...user }, { expiresIn: "1d" });

    // Set the token in a cookie
    resp.cookie("accessToken", accessToken, {
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    delete user.password;

    return resp
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: { ...user, accessToken: accessToken },
      });
  } catch (error:any) {
   
  console.log(error);
    return resp.status(400).json({ success: false, message: "Login failed" });
  }
};

export { SignUpController, loginController };
