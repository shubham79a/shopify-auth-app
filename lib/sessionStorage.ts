import { Session as ShopifySession } from '@shopify/shopify-api';

const store: Record<string, ShopifySession> = {};

export const sessionStorage = {
  async storeSession(session: ShopifySession) {
    store[session.id] = session;
    return true;
  },
  async loadSession(id: string) {
    return store[id] || undefined;
  },
  async deleteSession(id: string) {
    delete store[id];
    return true;
  },
  async deleteSessions(ids: string[]) {
    ids.forEach(id => delete store[id]);
    return true;
  },
  async findSessionsByShop(shop: string) {
    return Object.values(store).filter((s) => s.shop === shop);
  },
};
