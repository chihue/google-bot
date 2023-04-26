import Fastify from 'fastify';
import dotenv from 'dotenv';
import { MongoConfig, isLive } from './config/MongoConfig.js';

dotenv.config();

const fastify = Fastify({
    logger: true
});

fastify.get('/live', async (request, reply) => {
    const mongoLive = await isLive();

    return {
        ok: true,
        msg: 'Server is running',
        mongoLive
    }
});

const start = async () => {
    await MongoConfig();

    try {
        await fastify.listen({
            port: process.env.PORT || 3000,
            host: process.env.HOST || '127.0.0.1'
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();