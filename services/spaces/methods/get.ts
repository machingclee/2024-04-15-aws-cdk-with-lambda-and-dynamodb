import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export default async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    const spaceId = event.queryStringParameters?.["id"];
    if (event.queryStringParameters) {
        if (!spaceId) {
            return {
                statusCode: 400,
                body: JSON.stringify("id required")
            }
        }

        event.queryStringParameters
        const res = await ddbClient.send(new GetItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id: { S: spaceId } }
        }));

        if (res.Item) {
            const unmarshalled = unmarshall(res.Item);
            return {
                statusCode: 200,
                body: JSON.stringify(unmarshalled)
            }
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify(`space with id: ${spaceId} not found`)
            }
        }
    } else {
        const result = await ddbClient.send(new ScanCommand({
            TableName: process.env.TABLE_NAME,
        }));
        const result_ = result.Items?.map(item => unmarshall(item));
        return {
            statusCode: 200,
            body: JSON.stringify(result_)
        }
    }
}