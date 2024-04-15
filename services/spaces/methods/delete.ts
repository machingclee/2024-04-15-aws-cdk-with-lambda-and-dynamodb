import { DeleteItemCommand, DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export default async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    if (event.queryStringParameters && "id" in event.queryStringParameters && event.body) {
        const spaceId = event.queryStringParameters["id"] || "";
        await ddbClient.send(new DeleteItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id: { S: spaceId } }
        }))

        return {
            statusCode: 204,
            body: JSON.stringify(`deleted item with id ${spaceId}`)
        }
    }

    return {
        statusCode: 201,
        body: JSON.stringify("Please provide valid arguments.")
    };
}