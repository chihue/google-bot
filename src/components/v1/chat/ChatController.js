export const testPublicRoutes = {
    schema: {},
    handler: async (_req, _res) => {
        return {
            "ok": true,
            "message": "Hello World! Im the public route"
        };
    },
};