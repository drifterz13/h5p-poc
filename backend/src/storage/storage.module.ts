import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioService } from './minio/minio.service.';
import minioConfig, {
  MINIO_CONFIG_TOKEN,
  MinioConfig,
} from './minio/minio.config';
import huaweiObsConfig, {
  HUAWEI_OBS_CONFIG_TOKEN,
  HuaweiObsConfig,
} from './huawei-obs/huawei-obs.config';
import { HuaweiObsService } from './huawei-obs/huawei-obs.service';

@Module({
  imports: [
    ConfigModule.forFeature(minioConfig),
    ConfigModule.forFeature(huaweiObsConfig),
  ],
  providers: [
    {
      provide: MinioService,
      useFactory: (configService: ConfigService) => {
        const minioConfig = configService.get<MinioConfig>(MINIO_CONFIG_TOKEN);
        return new MinioService(minioConfig);
      },
      inject: [ConfigService],
    },
    {
      provide: HuaweiObsService,
      useFactory: (configService: ConfigService) => {
        const huaweiObsConfig = configService.get<HuaweiObsConfig>(
          HUAWEI_OBS_CONFIG_TOKEN,
        );
        return new HuaweiObsService(huaweiObsConfig);
      },
      inject: [ConfigService],
    },
  ],
  exports: [MinioService, HuaweiObsService],
})
export class StorageModule {}
