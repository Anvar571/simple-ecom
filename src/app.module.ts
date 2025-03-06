import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { Modules } from './modules/modeles';

@Module({
  imports: [CommonModule, Modules],
})
export class AppModule {}
