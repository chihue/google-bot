import { PublicRouter } from './v1/public.js';

export default async (fastify) => {
    PublicRouter(fastify);
};