import { testPublicRoutes } from './ChatController.js';

//Route -> /v1/public/chat/test

export default async (server) => {
    server.route({
        method: "GET",
        url: "/test",
        handler: testPublicRoutes.handler
    });
}