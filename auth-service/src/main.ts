import {
  ValidationPipe,
  INestMicroservice
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './auth/filter/http-exception.filter';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from './auth/auth.pb';
import { join } from 'path';


async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:50051`,
      package: protobufPackage,
      protoPath: join('node_modules/microservice-protos/proto/auth.proto'),
    },
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}
void bootstrap();
