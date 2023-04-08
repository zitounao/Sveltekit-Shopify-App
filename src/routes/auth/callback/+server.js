import shopify from "$lib/shopify";
import handleSession from "$lib/handleSession";
import dotenv from "dotenv";
dotenv.config();

export const GET = async (event) => {

    // cookies are found in event.cookies instead of event.request.headers.cookie
    // so we need to move them to the request headers or the shopify auth callback will fail: oauth cookie not found for shop

    const cookies = [
        { name: 'shopify_app_state.sig', value: event.cookies.get('shopify_app_state.sig') },
        { name: 'shopify_app_state', value: event.cookies.get('shopify_app_state') }
    ]

    event.request.headers.cookie = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')

    const rawRes = {
        statusCode: 302,
        statusText: 'Found',
        headers: {
            'Content-Type': 'text/html',
            'Location': `https://${process.env.SHOP_NAME}/admin/apps/${process.env.SHOPIFY_API_KEY}`,
        },
        getHeaders() { return this.headers },
        setHeader(name, value) { this.headers[name] = value },
        end() { }
    }

    try {
        const callback = await shopify.auth.callback({
            rawRequest: event.request,
            rawResponse: rawRes
        })

        const { session } = callback;
        await handleSession.storeSession(session);

    } catch (error) {
        console.log(error)
    }

    return new Response(null, {
        status: rawRes.statusCode,
        headers: rawRes.headers
    });
}