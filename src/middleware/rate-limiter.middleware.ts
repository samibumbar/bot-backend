import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

const requestsMap = new Map<string, { count: number; timestamp: number }>();
const LIMIT = 5;
const TIME_WINDOW = 60 * 1000;

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const ip = req.ip || req.connection.remoteAddress;
    const currentTime = Date.now();

    if (!requestsMap.has(ip)) {
      requestsMap.set(ip, { count: 1, timestamp: currentTime });
      return next();
    }

    const requestInfo = requestsMap.get(ip);
    if (requestInfo) {
      if (currentTime - requestInfo.timestamp < TIME_WINDOW) {
        if (requestInfo.count >= LIMIT) {
          throw new HttpException(
            'Rate limit exceeded. Please try again later.',
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        requestInfo.count += 1;
      } else {
        requestInfo.count = 1;
        requestInfo.timestamp = currentTime;
      }
    }
    return next();
  }
}
