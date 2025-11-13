import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { VERSION } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix(`api`);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (process.env.ENABLE_SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('EasyGenerator nestjs backend docs')
      .setDescription('EasyGenerator nestjs backend docs')
      .setVersion(VERSION)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          name: 'Authorization',
        },
        'access-token',
      )
      .addTag('auth')
      .addTag('users')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    //swagger should be disabled in production
    SwaggerModule.setup('/api', app, document, {
      customCssUrl: `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.1/swagger-ui.min.css`,
      customJs: [
        `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.1/swagger-ui-bundle.min.js`,
        `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.1/swagger-ui-standalone-preset.min.js`,
      ],
      swaggerOptions: { persistAuthorization: true },
    });
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
