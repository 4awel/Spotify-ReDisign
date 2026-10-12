import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filtres/http-exeption.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Настройка CORS: FRONTEND_URL может содержать несколько адресов через запятую
  const frontendUrls = (process.env.FRONTEND_URL || '')
    .split(',')
    .map((url) => url.trim().replace(/\/$/, ''))
    .filter(Boolean);
  const corsOrigins = [
    'http://localhost:3008',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:8080',
    ...frontendUrls,
  ];

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    exposedHeaders: ['Authorization'],
    maxAge: 3600,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global prefix (optional)
  // app.setGlobalPrefix('api');

  // Локально — PORT_SERVER, на Render — PORT (выставляется платформой)
  const PORT = Number(process.env.PORT_SERVER || process.env.PORT || 4000);
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${configService.get<string>('NODE_ENV')}`);
  console.log(`🔗 CORS enabled for origins: ${corsOrigins.join(', ')}`);
}
bootstrap();
