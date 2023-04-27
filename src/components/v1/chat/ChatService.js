import { getCollection, collections } from '../../../config/MongoConfig.js'
import Request from '../../../utils/Request.js';

const aviableActions = Object.freeze({
    CHATGPT: { id: "1", "name": "ChatGPT", "description": "Hacer una preggunta a ChatGPT", "arguments": "texto a buscar" },
    CHATGPTKEY: { id: "4", "name": "ChatGPT Key", "description": "Settear la key de Chat GPT", "arguments": "Key" },
    EXPORTAR: { id: "2", "name": "Exportar", "description": "Exportar switching luz", "arguments": "" },
    IMPORTAR: { id: "3", "name": "Importar", "description": "Importar switching luz", "arguments": "" }
})

export async function processMessage({
    type,
    commandId,
    argumentText = '',
    email,
    displayName = '',
    isDialogEvent = false,
}) {
    if (!email) throw new Error('No email provided');
    else email = email.trim().toLowerCase();
    if (argumentText) argumentText = argumentText.trim();

    console.log("Command id1: ", commandId, typeof commandId, typeof aviableActions.CHATGPT.id)


    let response = {
        text: `Hola ${displayName}, no entiendo lo que me dices`
    };
    try {
        if (commandId) {
            console.log("Command id: ", commandId)
            switch (commandId) {
                case aviableActions.CHATGPT.id:
                    response = makeChatGPTRequest({
                        argumentText,
                        email,
                    });
                    break;
                case aviableActions.CHATGPTKEY.id:
                    if (!argumentText) {
                        response = {
                            text: 'Necesito una api key para poder usar ChatGPT'
                        };
                    } else {
                        response = {
                            text: 'Vale, uso este api key para ChatGPT'
                        };

                        getCollection(collections.GPTKEYS).updateOne({
                            _id: email
                        },
                            {
                                $set: {
                                    key: argumentText,
                                    updatedAT: new Date(),
                                },
                            },
                            {
                                upsert: true
                            }
                        );
                    }
                    break;
                case aviableActions.EXPORTAR.id:
                case aviableActions.IMPORTAR.id:
                    response = {
                        text: 'Hola, estoy implementandolo'
                    };
                    break;
                default:
                    response = {
                        text: 'Hola, no entiendo lo que me dices'
                    };
                    break;
            }
        }
    } catch (err) {
        console.log(err);
    }

    return response;
}


async function makeChatGPTRequest({
    argumentText,
    email,
}) {
    const apiKey = (await getCollection(collections.GPTKEYS).findOne({
        _id: email
    }))?.key;

    if (!apiKey) {
        return {
            text: 'No tengo una api key para ChatGPT'
        };
    }

    const body = {
        "model": "text-davinci-003",
        "prompt": argumentText + "###",
        "temperature": 0,
        "max_tokens": 182,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        "stop": ["###"]
    };

    const request = await Request({
        bearerToken: apiKey,
        url: 'https://api.openai.com/v1/completions',
        method: 'POST',
        body,
    });

    if (request.ok) {
        return {
            text: request.body.choices[0].text
        };
    }

    return {
        text: 'No he podido hacer la petición a ChatGPT, comprueba que el token es correcto'
    };
}