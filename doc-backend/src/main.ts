import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter);
  const swaggerConfig = new DocumentBuilder()
  .setTitle("Doc APP")
  .setVersion("v1")
  .build();
  app.enableCors();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('implementation/api/document',app,document);
  await app.listen(+process.env.NODE_PORT);
}
bootstrap();
