import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export default async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    if (event.queryStringParameters && "id" in event.queryStringParameters && event.body) {
        const spaceId = event.queryStringParameters["id"] || "";
        const [key, value] = Object.entries(JSON.parse(event.body))[0] as [string, string];
        const updateResult = await ddbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                "id": { S: spaceId }
            },
            UpdateExpression: "set #attr = :new",
            ExpressionAttributeNames: {
                "#attr": key
            },
            ExpressionAttributeValues: {
                ":new": {
                    "S": value
                }
            },
            ReturnValues: "UPDATED_NEW"
        }))

        return {
            statusCode: 204,
            body: JSON.stringify(updateResult.Attributes)
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify("Please provide value arguments")
    };
}