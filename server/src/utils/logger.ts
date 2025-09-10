import winston from 'winston';

interface CustomLogger extends winston.Logger {
  infoObject: (obj: any, message?: string) => void;
  withContext: (context: string) => {
    info: (msg: string) => void;
    error: (msg: string) => void;
    debug: (msg: string) => void;
  };
}

const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(
        timestamp(),
        colorize(),
        myFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log', format: winston.format.uncolorize() }),
    ],
}) as CustomLogger;

logger.infoObject = function(obj: any, message?: string) {
    const msg = message ? `${message} ${JSON.stringify(obj)}` : JSON.stringify(obj);
    this.info(msg);
};

logger.withContext = function(context: string) {
    const prefix = `[${context}] `;
    return {
        info: (msg: string) => logger.info(prefix + msg),
        error: (msg: string) => logger.error(prefix + msg),
        debug: (msg: string) => logger.debug(prefix + msg),
    };
};

export default logger;