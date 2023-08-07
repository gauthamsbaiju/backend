import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: './src/logs/combined.log' }),
    ],
    exitOnError: false,
  });

  export default logger;