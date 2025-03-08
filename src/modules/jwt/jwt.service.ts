import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/common/configs/config.service';

@Injectable()
export class AppJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  async getTokens(payload) {
    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: await this.getRefreshToken(payload),
    };
  }

  async getAccessToken(payload): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService?.jwt?.secret ?? 'default_secret',
      expiresIn: this.configService?.jwt?.expiresIn ?? '15m',
    });

    return accessToken;
  }

  async getRefreshToken(payload): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService?.jwt?.secret ?? 'default_secret',
      expiresIn: '7d',
    });

    return refreshToken;
  }

  async verifyAccessToken(token: string): Promise<{ id: string } | null> {
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwt.secret,
      });

      return { id: user?.id };
    } catch (error) {
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<{ id: string } | null> {
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwt.secret,
      });

      return { id: user?.id };
    } catch (error) {
      return null;
    }
  }
}
