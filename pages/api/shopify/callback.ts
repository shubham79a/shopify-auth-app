import { shopify } from "../shopify"
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    return res.redirect('/');
  } catch (error) {
    console.error('Auth callback error:', error);
    return res.status(500).send('Callback auth failed');
  }
}
