import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { whiteList } from './config/configuration';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: whiteList,
    credentials: true,
    // exposedHeaders: ['set-cookie'],
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.PORT', 3030);

  await app.listen(port, () => console.log(`Server started on port: ${port}`));
}

bootstrap();
