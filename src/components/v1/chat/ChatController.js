export const testPublicRoutes = {
    schema: {},
    handler: async (_req, _res) => {
        return {
            "ok": true,
            "message": "Hello World! Im the public route"
        };
    },
};

export const chatRequest = {
    schema: {},
    handler: async (req, _res) => {
        let text = 'Hola';

        console.log(req.body)

        return {
            text
        };
    },
};