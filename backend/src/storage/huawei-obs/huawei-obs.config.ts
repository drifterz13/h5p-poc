import { registerAs } from '@nestjs/config';

export const HUAWEI_OBS_CONFIG_TOKEN = 'huawei-obs';

export class HuaweiObsConfig {
  HUAWEI_OBS_ACCESS_KEY_ID: string;
  HUAWEI_OBS_SECRET_ACCESS_KEY: string;
  HUAWEI_OBS_ENDPOINT: string;
  HUAWEI_OBS_BUCKET_NAME: string;
}

export default registerAs<HuaweiObsConfig>(
  HUAWEI_OBS_CONFIG_TOKEN,
  async () => {
    return {
      HUAWEI_OBS_ACCESS_KEY_ID: process.env.HUAWEI_OBS_ACCESS_KEY_ID,
      HUAWEI_OBS_SECRET_ACCESS_KEY: process.env.HUAWEI_OBS_SECRET_ACCESS_KEY,
      HUAWEI_OBS_ENDPOINT: process.env.HUAWEI_OBS_ENDPOINT,
      HUAWEI_OBS_BUCKET_NAME: process.env.HUAWEI_OBS_BUCKET_NAME,
    };
  },
);
