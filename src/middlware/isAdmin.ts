import express, { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utlis/jwt'; // Corrected typo in 'utlis' to 'utils'
import { logger } from '../utlis/logger';



// interface CustomRequest extends Request {
//     user?: any;
// }

//  function for unauthorized responses
const unauthorizedResponse = (res: Response, message: string) => {
    return res.status(401).json({ success: false, message });
};



export const isAdmin = async (req:any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    console.log(authHeader);
 
   

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return unauthorizedResponse(res, "Unauthorized access");
    }

    // Extract the token by removing the 'Bearer ' prefix
    const token = authHeader.split(' ')[1];
    const result = verifyToken(token);

    // Check if token is valid
    if (result.isValid) {
       
        logger.info("Token is valid. Decoded payload:", result.decoded);
        console.log(result.decoded);

        
        
        req.user = result.decoded;
        return next();
    }

    return unauthorizedResponse(res, "Unauthorized access");
};
