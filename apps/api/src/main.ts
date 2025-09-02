import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS: strict in prod, forgiving in dev
  const raw = config.get<string>('CORS_ORIGIN') ?? '';
  const origins = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const isProd = process.env.NODE_ENV === 'production';
  app.enableCors({
    origin: origins.length
      ? origins
      : isProd
      ? []
      : [/^http:\/\/localhost:\d+$/],
  });

  const port = Number(config.get('API_PORT') ?? 3000);
  if (Number.isNaN(port)) {
    throw new Error('Invalid API_PORT: must be a number');
  }

  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('NestJS bootstrap failed:', err);
  process.exit(1);
});
