import 'reflect-metadata';

import { AllExceptionFilter } from 'src/utils/filters/http-exception.filter';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as momentTimezone from 'moment-timezone';
import * as compression from 'compression';
import helmet from 'helmet';

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
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.use(helmet());

  app.enableCors({
    origin: 'http://localhost:8000',
    methods: ['get', 'post', 'put', 'delete', 'patch'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use(compression());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(8080);
}

bootstrap();
