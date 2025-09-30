import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RecipesModule } from './recipes/recipes.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    PrismaModule,
    RecipesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env'],
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
