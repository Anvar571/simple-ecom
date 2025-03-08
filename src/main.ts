import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfigService } from './common/configs/config.service';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const config = app.get(AppConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Simple E-commerse API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.server.port, config.server.host, async () => {
    console.log(
      `🚀 Server running on ${config.server.host}:${config.server.port} port`,
    );
  });
}

setImmediate(() => bootstrap());
