import ChatRouter from '../../components/v1/chat/ChatRouter.js';

export async function PublicRouter(fastify) {
    fastify.register(
        async (server) => publicRouterRoutes(server),
        {
            prefix: "/v1/public"
        }
    );
};

async function publicRouterRoutes(server) {
    server.register((server) => ChatRouter(server), { prefix: '/chat' });
}