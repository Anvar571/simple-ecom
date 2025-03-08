import { Module } from '@nestjs/common'
import { AppJwtService } from './jwt.service'
import { AppConfigService } from 'src/common/configs/config.service'

@Module({
	providers: [AppJwtService, AppConfigService],
	exports: [AppJwtService,AppConfigService],
})
export class AppJwtModule {}
