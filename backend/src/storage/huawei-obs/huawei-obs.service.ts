import { Injectable, Logger } from '@nestjs/common';
import * as ObsClient from 'esdk-obs-nodejs';
import { HuaweiObsConfig } from './huawei-obs.config';
import { IStorageService } from '../storage.interface';

@Injectable()
export class HuaweiObsService implements IStorageService {
  private obsClient: ObsClient;

  private logger = new Logger(HuaweiObsService.name);

  constructor(private huaweiObsConfig: HuaweiObsConfig) {
    this.logger.debug(huaweiObsConfig);

    this.obsClient = new ObsClient({
      access_key_id: this.huaweiObsConfig.HUAWEI_OBS_ACCESS_KEY_ID,
      secret_access_key: this.huaweiObsConfig.HUAWEI_OBS_SECRET_ACCESS_KEY,
      server: this.huaweiObsConfig.HUAWEI_OBS_ENDPOINT,
    });
  }

  async getH5PFile(contentId: string, filePath: string): Promise<Buffer> {
    const bucket = this.huaweiObsConfig.HUAWEI_OBS_BUCKET_NAME;
    const objectPath = `${contentId}/${filePath}`;

    this.logger.debug(`Bucket = ${bucket}, Key = ${objectPath}`);

    try {
      const result = await this.obsClient.getObject({
        Bucket: bucket,
        Key: objectPath,
      });

      if (result.CommonMsg.Status !== 200) {
        this.logger.debug(`Error = ${JSON.stringify(result, null, 4)}`);
        throw new Error(`Failed to get object: ${result.CommonMsg.Message}`);
      }

      return Buffer.from(result.InterfaceResult.Content);
    } catch (error) {
      this.logger.error(error);
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
