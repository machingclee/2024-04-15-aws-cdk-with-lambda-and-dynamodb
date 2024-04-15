import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda"
import { join } from "path";
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Lambda } from 'aws-cdk-lib/aws-ses-actions';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';

export class LambdaStack extends cdk.Stack {
  public helloLambdaIntegration: LambdaIntegration
  public spaceLambdaIntegration: LambdaIntegration
  constructor(scope: Construct, id: string, props: cdk.StackProps & {
    targetBucketArn: string,
    spacesTable: ITable
  }) {
    super(scope, id, props);
    // const lambda = new LambdaFunction(
    const testLambda = new NodejsFunction(
      this,
      "lambda-from-file", // id of this lambda function,
      {
        runtime: Runtime.NODEJS_18_X,
        handler: "handler",
        entry: join(__dirname, "..", "services", "hello.ts"),
        environment: {
          TARGET_BUCKET: props.targetBucketArn
        }
      }
    )
    /**
     * list of all condition keys:
     * https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazons3.html
     */
    testLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "s3:ListAllMyBuckets",
        "s3:ListBucket"
      ],
      resources: ["*"]
    }))

    const spaceLambda = new NodejsFunction(
      this,
      "space-lambda", // id of this lambda function,
      {
        runtime: Runtime.NODEJS_18_X,
        handler: "handler",
        entry: join(__dirname, "..", "services", "spaces", "handler.ts"),
        environment: {
          TABLE_NAME: props.spacesTable.tableName
        }
      }
    )

    spaceLambda.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.spacesTable.tableArn],
      actions: [
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem"
      ]
    }))


    this.helloLambdaIntegration = new LambdaIntegration(testLambda);
    this.spaceLambdaIntegration = new LambdaIntegration(spaceLambda);
  }


}
