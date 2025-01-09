import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { HuaweiObsService } from 'src/storage/huawei-obs/huawei-obs.service';

@Controller('videos')
export class VideoController {
  private logger = new Logger(VideoController.name);

  constructor(private huaweiObsService: HuaweiObsService) {}

  // Serve all H5P content files through this endpoint
  @Get(':contentId/*')
  async getH5PFile(
    @Param('contentId') contentId: string,
    @Param('0') filePath: string,
    @Res() response: Response,
  ) {
    try {
      const buffer = await this.huaweiObsService.getH5PFile(
        contentId,
        filePath,
      );

      // Set appropriate content type
      const ext = filePath.split('.').pop().toLowerCase();
      const contentTypes = {
        json: 'application/json',
        js: 'application/javascript',
        css: 'text/css',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        svg: 'image/svg+xml',
        mp4: 'video/mp4',
        webm: 'video/webm',
      };

      response.setHeaders(
        new Headers({
          'Content-Type': contentTypes[ext] || 'application/octet-stream',
          'Cache-Control': 'max-age=3600',
        }),
      );

      return response.send(buffer);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
