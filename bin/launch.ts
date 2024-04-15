#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';
import { PhotoS3Stack } from '../lib/photo-s3-stacks';
import { APIStack } from '../lib/api-stack';
import { DataStack as DataTableStack } from '../lib/data-table-stack';

const app = new cdk.App();
const photoStack = new PhotoS3Stack(app, 'photoS3Stacks');
const dataTableStack = new DataTableStack(app, "spacesTableStack");
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    targetBucketArn: photoStack.photoBucketName,
    spacesTable: dataTableStack.spaceTable
});
const apiStack = new APIStack(app, "ApiStack", {
    helloLambdaIntegration: lambdaStack.helloLambdaIntegration,
    spaceLambdaIntegration: lambdaStack.spaceLambdaIntegration
})