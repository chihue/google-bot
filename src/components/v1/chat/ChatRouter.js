import { testPublicRoutes, chatRequest } from './ChatController.js';

//Route -> /v1/public/chat/test

export default async (server) => {
    server.route({
        method: "GET",
        url: "/test",
        handler: testPublicRoutes.handler
    });

    server.route({
        method: "POST",
        url: "",
        handler: chatRequest.handler
    });
}