import bcrypt from 'bcrypt'

export const hashPassword=(password:string):string=>{
    return bcrypt.hashSync(password,10);
}


export const comparePassword=(password:string,hashPassword:string)=>{
    return bcrypt.compare(password,hashPassword);
}