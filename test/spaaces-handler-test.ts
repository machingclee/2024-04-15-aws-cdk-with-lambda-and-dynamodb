import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../services/spaces/handler";

handler(
    {
        httpMethod: "DELETE",
        queryStringParameters: {
            id: "0206f811-3880-4065-bd5f-3a82b6e64de5"
        },
        body: JSON.stringify({ location: "Chipi Chipi ChapaChap" })
    } as any as APIGatewayProxyEvent,
    {} as any
);
