import mongoose from 'mongoose';
import {CONFIG} from '../config/enviroment'
import { logger } from './logger';

mongoose.connect(`${CONFIG.db}`)
  .then(() => logger.info("connection succesfull with MongoDB"))
  .catch((err)=>{
    logger.error("Error connecting to MongoDB", err);
    process.exit(1);
  });