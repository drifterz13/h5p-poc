export interface IStorageService {
  getH5PFile(contentId: string, filePath: string): Promise<Buffer>;
  getH5PConfig(contentId: string): Promise<{
    h5pJson: any;
    contentJson: any;
  }>;
}
