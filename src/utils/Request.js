export default async function Request({
    url,
    method = 'GET',
    body = null,
    headers = {},
    bearerToken = null,
    params = []
}) {
    let responseDoc = {
        body: {},
        status: -1,
        ok: false,
    }

    try {
        if (!headers['Content-Type'] && method !== 'GET') {
            headers = { ...headers, 'Content-Type': 'application/json' };
        }

        if (bearerToken) {
            headers = { ...headers, Authorization: `Bearer ${bearerToken}` };
        }

        if (params && params.length > 0) {
            url += "?";
            params.forEach((param, index) => {
                url += param.key + "=" + param.value;
                if (index < params.length - 1) {
                    url += "&";
                }
            });
        }


        let options = {
            method: method,
            headers: headers,
        }

        if (body) {
            options = { ...options, body: JSON.stringify(body) }
        }

        const response = await fetch(url, options);
        let bodyResponse;
        try {
            bodyResponse = await response.json();
        } catch (e) {
            bodyResponse = e;
        }


        responseDoc = {
            status: response.status,
            ok: response.status >= 200 && response.status < 300,
            body: bodyResponse
        };
    } catch (e) {
        console.log("Error " + e);
    }


    return responseDoc;
}