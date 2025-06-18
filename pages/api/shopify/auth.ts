import { shopify } from '../shopify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shop } = req.query;

  if (!shop || typeof shop !== 'string') {
    return res.status(400).send('Missing shop param');
  }

  try {
    const redirectUrl = await shopify.auth.begin({
      shop,
      callbackPath: '/api/shopify/callback',
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });

    return res.redirect(redirectUrl);
  } catch (error) {
    console.error('Auth start error:', error);
    return res.status(500).send('Failed to initiate auth');
  }
}
