import { NextFunction, Request, Response } from 'express';
import logger from '@utils/logger';

type LogLevel = 1 | 2 | 3 | 4;

// Logs different amount of detail based on level
// 1 - Error only
// 2 - Warnings and errors
// 3 - Info, warnings, and errors
// 4 - Debug, info, warnings, and errors
export const logAtLevel = (level: LogLevel) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { method, originalUrl, body, query, user } = req;
            const start = Date.now();

            res.on('finish', () => {
                const duration = Date.now() - start;
                const { statusCode } = res;

                const userInfo = user ? ` user=${JSON.stringify(user)}` : '';

                if (level >= 4) {
                    logger.debug(`${method} ${originalUrl} ${statusCode} - ${duration}ms${userInfo} body=${JSON.stringify(body)} query=${JSON.stringify(query)}`);
                } else if (level >= 3) {
                    logger.info(`${method} ${originalUrl} ${statusCode}${userInfo}`);
                } else if (level >= 2 && statusCode >= 400) {
                    logger.warn(`${method} ${originalUrl} ${statusCode}${userInfo}`);
                } else if (level >= 1 && statusCode >= 500) {
                    logger.error(`${method} ${originalUrl} ${statusCode}${userInfo}`);
                }
            });

            return next();
        } catch (error) {
            logger.error(`Logging middleware error: ${(error as Error).message}`);
            return next();
        }
    };
}