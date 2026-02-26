import fs from "fs";
import path from "path";
import winston from "winston";

interface CustomLogger extends winston.Logger {
  infoObject: (obj: any, message?: string) => void;
  withContext: (context: string) => {
    info: (msg: string) => void;
    error: (msg: string) => void;
    debug: (msg: string) => void;
  };
}

const { combine, timestamp, printf, colorize } = winston.format;
const isServerlessRuntime = process.env.VERCEL === "1";

// Custom log format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const transports: winston.transport[] = [new winston.transports.Console()];

if (!isServerlessRuntime) {
  const logDir = path.resolve(process.cwd(), "logs");

  try {
    fs.mkdirSync(logDir, { recursive: true });

    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, "combined.log"),
        format: winston.format.uncolorize(),
      }),
    );
  } catch (error) {
    console.warn(`File logging disabled: ${(error as Error).message}`);
  }
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(timestamp(), colorize(), myFormat),
  transports,
}) as CustomLogger;

logger.infoObject = function (obj: any, message?: string) {
  const msg = message ? `${message} ${JSON.stringify(obj)}` : JSON.stringify(obj);

  this.info(msg);
};

logger.withContext = function (context: string) {
  const prefix = `[${context}] `;

  return {
    info: (msg: string) => logger.info(prefix + msg),
    error: (msg: string) => logger.error(prefix + msg),
    debug: (msg: string) => logger.debug(prefix + msg),
  };
};

export default logger;
