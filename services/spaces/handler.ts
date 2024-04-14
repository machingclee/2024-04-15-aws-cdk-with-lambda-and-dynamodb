import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"
import { v4 as uuidv4 } from "uuid";
import post from "./methods/post";
import get from "./methods/get";

const ddbClient = new DynamoDBClient({});

const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    let message: string = "";
    try {
        switch (event.httpMethod) {
            case "GET":
                return get(event, ddbClient);
                break;
            case "POST":
                return post(event, ddbClient);
                break;
            default:
                break;
        }


        const res: APIGatewayProxyResult = {
            statusCode: 200,
            body: message
        }

        return res;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

export {
    handler
}