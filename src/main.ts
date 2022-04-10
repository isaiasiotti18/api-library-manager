//import 'reflect-metadata';

import { AllExceptionFilter } from './shared/filters/http-exception.filter';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as momentTimezone from 'moment-timezone';

const config = new DocumentBuilder()
  .setTitle('API Library Manager')
  .setDescription('A simple API for managment Libraries')
  .setVersion('1.0')
  .addTag('LibraryManager')
  .addBearerAuth(
    {
      type: 'http',
      bearerFormat: 'JWT',
    },
    'defaultBearerAuth',
  )
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //app.useGlobalFilters(new AllExceptionFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(8080);
}

bootstrap();
