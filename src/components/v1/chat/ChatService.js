const aviableActions = Object.freeze({
    CHATGPT: { id: 1, "name": "ChatGPT", "description": "Hacer una preggunta a ChatGPT", "arguments": "texto a buscar" },
    CHATGPTKEY: { id: 4, "name": "ChatGPT Key", "description": "Settear la key de Chat GPT", "arguments": "Key" },
    EXPORTAR: { id: 2, "name": "Exportar", "description": "Exportar switching luz", "arguments": "" },
    IMPORTAR: { id: 3, "name": "Importar", "description": "Importar switching luz", "arguments": "" }
})

const dialog = {
    "action_response": {
        "type": "DIALOG",
        "dialog_action": {
            "dialog": {
                "body": {
                    "sections": [
                        {
                            "header": "Add new contact",
                            "widgets": [
                                {
                                    "textInput": {
                                        "label": "Name",
                                        "type": "SINGLE_LINE",
                                        "name": "contactName"
                                    }
                                },
                                {
                                    "textInput": {
                                        "label": "Address",
                                        "type": "MULTIPLE_LINE",
                                        "name": "address"
                                    }
                                },
                                {
                                    "decoratedText": {
                                        "text": "Add to favorites",
                                        "switchControl": {
                                            "controlType": "SWITCH",
                                            "name": "saveFavorite"
                                        }
                                    }
                                },
                                {
                                    "decoratedText": {
                                        "text": "Merge with existing contacts",
                                        "switchControl": {
                                            "controlType": "SWITCH",
                                            "name": "mergeContact",
                                            "selected": true
                                        }
                                    }
                                },
                                {
                                    "buttonList": {
                                        "buttons": [
                                            {
                                                "text": "Next",
                                                "onClick": {
                                                    "action": {
                                                        "function": "openSequentialDialog"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
}

export async function processMessage({
    type,
    commandId,
    argumentText = '',
    email,
    displayName = '',
}) {
    let response = {};
    try {
        if (commandId) {
            switch (commandId) {
                case aviableActions.CHATGPT.id:
                    response = {
                        text: 'Hola, estoy implementandolo'
                    };
                    break;
                case aviableActions.CHATGPTKEY.id:
                    response = dialog;
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
        } else {
            response = {
                text: `Hola ${displayName}, no entiendo lo que me dices`
            };
        }
    } catch (err) {
        console.log(err);
    }

    return response;
}
