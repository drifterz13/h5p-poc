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

  async getH5PFile(
    contentId: string,
    filePath: string,
  ): Promise<Buffer | string> {
    if (
      ['.png', '.jpg', '.jpeg', '.svg', '.woff', '.woff2', '.ttf'].some((ext) =>
        filePath.endsWith(ext),
      )
    ) {
      // TODO: Create pre-signed url when using it in production
      return this.getHuaweiObsLink(`/${contentId}/${filePath}`);
    }

    return this.getH5PFileAsBuffer(contentId, filePath);
  }

  private async getH5PFileAsBuffer(
    contentId: string,
    filePath: string,
  ): Promise<Buffer> {
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

  private getHuaweiObsLink(path: string): string {
    const obsEndpoint = this.huaweiObsConfig.HUAWEI_OBS_ENDPOINT.replace(
      'https://',
      '',
    );
    let finalizedPath = path;
    if (path.startsWith('/')) {
      finalizedPath = path.substring(1);
    }

    return `https://${this.huaweiObsConfig.HUAWEI_OBS_BUCKET_NAME}.${obsEndpoint}${finalizedPath}`;
  }
}
