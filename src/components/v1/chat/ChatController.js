import { processMessage } from './ChatService.js'

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
        const body = req.body;

        const type = body.type;
        const commandId = body.slashCommand?.commandId;
        const argumentText = body.message?.argumentText;
        const email = body.user?.email;
        const displayName = body.user?.displayName;
        const isDialogEvent = body.isDialogEvent;

        try {
            return await processMessage({
                type,
                commandId,
                argumentText,
                email,
                displayName,
                isDialogEvent,
            });
        } catch (err) {
            return {
                text: 'Lo siento, ha ocurrido un error ' + err.message
            };
        }
    }
};