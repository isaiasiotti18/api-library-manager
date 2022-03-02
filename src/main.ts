import 'reflect-metadata';

import { AllExceptionFilter } from './shared/filters/http-exception.filter';

import { fastifyHelmet } from 'fastify-helmet';

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { contentParser } from 'fastify-multer';

const config = new DocumentBuilder()
  .setTitle('API Library Manager')
  .setDescription('A simple API for managment Libraries')
  .setVersion('1.0')
  .addTag('LibraryManager')
  .build();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // If you are not going to use CSP at all, you can use this:
  app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });
  app.register(contentParser);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  await app.listen(8080);
}

bootstrap();
