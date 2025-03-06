import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { IConfig } from './config.types';

@Injectable()
export class ConfigService implements IConfig {
  constructor(private readonly configService: NestConfigService) {}

  get server() {
    return {
      host: this.configService.get('HOST', 'localhost'),
      port: this.configService.get('PORT', 5000),
    };
  }

  get database() {
    return {
      host: this.configService.get<string>('DATABASE_HOST', 'localhost'),
      port: this.configService.get<number>('DATABASE_PORT', 5432),
      username: this.configService.get<string>('DATABASE_USER', 'postgres'),
      password: this.configService.get<string>('DATABASE_PASSWORD', 'secret'),
      database: this.configService.get<string>('DATABASE_NAME', 'mydb'),
    };
  }

  get jwt() {
    return {
      secret: this.configService.get<string>('JWT_SECRET', 'default_secret'),
      expiresIn: this.configService.get<number>('JWT_EXPIRATION', 3600),
    };
  }
}
