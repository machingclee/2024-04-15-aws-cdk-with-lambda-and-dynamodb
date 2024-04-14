import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../services/spaces/handler";

handler(
    {
        httpMethod: "GET",
        queryStringParameters: {
            id: "0206f811-3880-4065-bd5f-3a82b6e64de5"
        }
    } as unknown as APIGatewayProxyEvent,
    {} as any
);
