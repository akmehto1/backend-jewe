import pino from 'pino'
import pretty from 'pino-pretty';
import moment from 'moment'
import { timeStamp } from 'console';


export const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,      // Adds colors to the logs
        translateTime: true, // Converts the timestamp to a human-readable format
        ignore: 'pid,hostname' // Ignore certain fields in the logs
      }
    }
  });
  
