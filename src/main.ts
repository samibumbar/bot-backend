import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://samibumbar.github.io',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const PORT = process.env.PORT || 3003;
  await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
}
bootstrap();
