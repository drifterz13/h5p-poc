import { Injectable, Logger } from '@nestjs/common';
import * as Minio from 'minio';
import { MinioConfig } from './minio.config';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private logger = new Logger(MinioService.name);

  constructor(private minioConfig: MinioConfig) {
    this.logger.debug(minioConfig);
    this.minioClient = new Minio.Client({
      endPoint: this.minioConfig.endPoint,
      port: this.minioConfig.port,
      useSSL: this.minioConfig.useSSL,
      accessKey: this.minioConfig.accessKey,
      secretKey: this.minioConfig.secretKey,
    });
  }

  async getH5PFile(contentId: string, filePath: string): Promise<Buffer> {
    const bucket = this.minioConfig.bucket;
    const objectPath = `${contentId}/${filePath}`;

    try {
      const dataStream = await this.minioClient.getObject(bucket, objectPath);
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        dataStream.on('data', (chunk) => chunks.push(chunk));
        dataStream.on('end', () => resolve(Buffer.concat(chunks)));
        dataStream.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Failed to get file ${filePath}: ${error.message}`);
    }
  }

  async getH5PConfig(contentId: string): Promise<{
    h5pJson: any;
    contentJson: any;
  }> {
    try {
      const [h5pBuffer, contentBuffer] = await Promise.all([
        this.getH5PFile(contentId, 'h5p.json'),
        this.getH5PFile(contentId, 'content/content.json'),
      ]);

      return {
        h5pJson: JSON.parse(h5pBuffer.toString()),
        contentJson: JSON.parse(contentBuffer.toString()),
      };
    } catch (error) {
      throw new Error(`Failed to get H5P configuration: ${error.message}`);
    }
  }
}
