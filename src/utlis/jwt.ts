import jwt from 'jsonwebtoken';

import {CONFIG} from '../config/enviroment';

export const signJWT=(payload:Object,options?:jwt.SignOptions | undefined)=>{
    console.log(payload);
    return jwt.sign(payload,CONFIG.jwt_private,{
        ...(options && options),algorithm:'RS256'
    })
}


export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, CONFIG.jwt_public);  // synchronous
        console.log(decoded);
        return { decoded, isValid: true };

    } catch (err) {
        return { message: 'Invalid token', isValid: false };
    }
};
