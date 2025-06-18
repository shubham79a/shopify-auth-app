import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { sessionStorage } from '../../lib/sessionStorage'; // your custom session file

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  hostName: process.env.HOST!.replace(/^https?:\/\//, ""),
  scopes: ['read_products'], // adjust scopes as needed
  sessionStorage,
});
