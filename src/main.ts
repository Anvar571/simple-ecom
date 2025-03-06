import { NestFactory } from '@nestjs/core';
import { INestApplication } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`);
  });
}
bootstrap();
