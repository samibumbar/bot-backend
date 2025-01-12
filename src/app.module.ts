import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';

@Module({
  imports: [ChatModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes({ path: 'chat', method: RequestMethod.POST });
  }
}
