import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

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

  const port = Number(process.env.PORT ?? config.get('API_PORT') ?? 3000);
  if (Number.isNaN(port)) {
    throw new Error('Invalid API_PORT: must be a number');
  }

  await app.listen(port);

  const url = await app.getUrl();
  console.log(`API is running at ${url}/api`);
}

bootstrap().catch((err) => {
  console.error('NestJS bootstrap failed:', err);
  process.exit(1);
});
