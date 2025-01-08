import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioService } from './minio/minio.service.';
import minioConfig, {
  MINIO_CONFIG_TOKEN,
  MinioConfig,
} from './minio/minio.config';

@Module({
  imports: [ConfigModule.forFeature(minioConfig)],
  providers: [
    {
      provide: MinioService,
      useFactory: (configService: ConfigService) => {
        const minioConfig = configService.get<MinioConfig>(MINIO_CONFIG_TOKEN);
        return new MinioService(minioConfig);
      },
      inject: [ConfigService],
    },
  ],
  exports: [MinioService],
})
export class StorageModule {}
