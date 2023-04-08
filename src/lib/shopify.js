import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import dotenv from 'dotenv';
dotenv.config();

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SCOPES.split(','),
    hostName: 'localhost:3000',
    hostScheme: 'http',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
    isCustomStoreApp: false
});


export default shopify;