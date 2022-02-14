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

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

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

  const config = new DocumentBuilder()
    .setTitle('API Library Manager')
    .setDescription('A simple API for managment Libraries')
    .setVersion('1.0')
    .addTag('LibraryManager')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(8080);
}
bootstrap();
