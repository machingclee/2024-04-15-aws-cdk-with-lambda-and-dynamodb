import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"
import { v4 } from "uuid";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client();

const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    const command = new ListBucketsCommand({});
    const listBucketResults = (await s3Client.send(command)).Buckets;
    const res: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(`Here is a list of my buckets: ${listBucketResults?.map(r => r.Name).join(", ")}`)
    }
    console.log(event);
    return res;
}

export {
    handler
}