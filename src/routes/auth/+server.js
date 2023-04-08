import shopify from "$lib/shopify";
import dotenv from "dotenv";
dotenv.config();

export const GET = async (event) => {

    // Here i'm simply adjusting the response to be accepted by the shopify library
    // The shopify library needs to use the header functions to set the headers including the location and cookies...etc
    const rawRes = {
        statusCode: 302,
        statusText: 'Found',
        headers: {
            'Content-Type': 'text/html',
            'Location': `https://${process.env.SHOP_NAME}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SCOPES}&redirect_uri=http://localhost:3000/auth/callback`
        },
        getHeaders() { return this.headers },
        setHeader(name, value) { this.headers[name] = value },
        end() { }
    }
    await shopify.auth.begin({
        shop: shopify.utils.sanitizeShop(process.env.SHOP_NAME, true),
        callbackPath: '/auth/callback',
        isOnline: false,
        rawRequest: event.request,
        rawResponse: rawRes
    })

    return new Response(null, {
        status: rawRes.statusCode,
        headers: rawRes.headers
    });

};