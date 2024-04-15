import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Function as LambdaFunction, LambdaInsightsVersion } from "aws-cdk-lib/aws-lambda"
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { LambdaIntegration, RestApi, Stage } from 'aws-cdk-lib/aws-apigateway';


export class APIStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: cdk.StackProps & {
        helloLambdaIntegration: LambdaIntegration,
        spaceLambdaIntegration: LambdaIntegration
    }) {
        super(scope, id, props);

        const api = new RestApi(this, "test-api",);
        const apiResources = api.root.addResource("test");
        apiResources.addMethod("GET", props.helloLambdaIntegration);

        const spaceRouter = api.root.addResource("spaces");
        spaceRouter.addMethod("GET", props.spaceLambdaIntegration);
        spaceRouter.addMethod("POST", props.spaceLambdaIntegration);
        spaceRouter.addMethod("POST", props.spaceLambdaIntegration);
        spaceRouter.addMethod("DELETE", props.spaceLambdaIntegration);
    }
}
