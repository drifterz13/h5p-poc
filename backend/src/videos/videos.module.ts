import { Module } from '@nestjs/common';
import { StorageModule } from 'src/storage/storage.module';
import { VideoController } from './videos.controller';

@Module({
  imports: [StorageModule],
  providers: [],
  controllers: [VideoController],
})
export class VideoModule {}
