import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsS3Service {
  private AWS_S3_BUCKET_NAME =
    this.configService.get<string>('AWS_S3_BUCKET_NAME');

  private AWS_REGION = this.configService.get<string>('AWS_REGION');

  private AWS_ACCESS_KEY_ID =
    this.configService.get<string>('AWS_ACCESS_KEY_ID');

  private AWS_SECRET_ACCESS_KEY = this.configService.get<string>(
    'AWS_SECRET_ACCESS_KEY',
  );

  constructor(private configService: ConfigService) {}

  public async uploadArquivo(file: any, id: string) {
    const s3 = new AWS.S3({
      region: this.AWS_REGION,
      accessKeyId: this.AWS_ACCESS_KEY_ID,
      secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
    });

    const fileExtension = file.originalname.split('.')[1];

    const urlKey = `${id}.${fileExtension}`;

    const params = {
      Body: file.buffer,
      Bucket: this.AWS_S3_BUCKET_NAME,
      Key: urlKey,
    };

    const data = s3
      .putObject(params)
      .promise()
      .then(() => {
        return {
          url: `https://${this.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${urlKey}`,
        };
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
    return data;
  }
}
