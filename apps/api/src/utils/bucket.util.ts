import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import config from "@config/config";

const credentials = {
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
};

const s3Client = new S3Client({ credentials, region: config.AWS_REGION });

/**
 * Method to uploading file in to S3 bucket.
 * @param {buffer} buffer
 * @param {string} file_name
 * @returns {Promise}
 */
export const uploadFilesInS3Bucket = async (
  buffer: Buffer,
  file_name: string
) => {
  try {
    const params: PutObjectCommandInput = {
      Bucket: config.AWS_BUCKET_NAME,
      Key: file_name,
      Body: buffer,
    };

    await s3Client.send(new PutObjectCommand(params));
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
/**
 * Method to getting object from s3 bucket
 * @param {string} file_name
 * @returns {String}
 */
export const getS3BucketFile = (file_name: string): string => {
  const url = `https://${config.AWS_BUCKET_NAME}.s3.${config.AWS_REGION}.amazonaws.com/${file_name}`;
  return url;
};

/**
 * Method to delete file in to S3 bucket.
 * @param {string} file_name
 * @returns {Promise}
 */
export const deleteS3BucketFile = async (file_name: string): Promise<any> => {
  try {
    const params: DeleteObjectCommandInput = {
      Bucket: config.AWS_BUCKET_NAME,
      Key: file_name,
    };
    await s3Client.send(new DeleteObjectCommand(params));
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
