import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Function as LambdaFunction } from "aws-cdk-lib/aws-lambda"
import { Bucket } from 'aws-cdk-lib/aws-s3';

export class PhotoS3Stack extends cdk.Stack {
  public readonly photoBucketName: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const photosBucket = new Bucket(this, "photo-s3-bucket", {
      bucketName: "photo-buckets-for-lambda-testing"
    })
    this.photoBucketName = photosBucket.bucketArn
  }
}
