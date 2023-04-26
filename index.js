import Fastify from 'fastify';
import dotenv from 'dotenv';
import { MongoConfig, isLive } from './src/config/MongoConfig.js';
import router from './src/router/router.js';

dotenv.config();

const start = async () => {
    try {
        const fastify = Fastify({
            logger: true
        });

        fastify.get('/live', async (request, reply) => {
            const mongoLive = await isLive();

            return {
                ok: true,
                msg: 'Server is running',
                mongoLive,
                ip: request.ip,
                ipRaw: request.raw.ip || '',
                ips: request.ips,
                ipRemote: request.raw.connection.remoteAddress
            }
        });


        await MongoConfig();

        fastify.listen({
            port: process.env.PORT || 3000,
            host: process.env.HOST || '127.0.0.1',
        });

        router(fastify);
    } catch (err) {
        console.log(err);
    }

}

start();