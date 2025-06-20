// pages/api/auth/[...shopify].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { shopify } from '../shopify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { shop } = req.query;

    if (typeof shop !== 'string') {
      return res.status(400).send('Missing shop');
    }

    const redirectUrl = await shopify.auth.begin({
      shop,
      callbackPath: '/api/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });

    return res.redirect(redirectUrl);
  }

  return res.status(405).send('Method Not Allowed');
}
