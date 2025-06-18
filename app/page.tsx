// 'use client';
// import { AppProvider as PolarisAppProvider } from '@shopify/polaris';
// import { Provider as AppBridgeReactProvider, TitleBar } from '@shopify/app-bridge-react';
// import '@shopify/polaris/build/esm/styles.css';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// // 
// function ClientApp() {
//   const [host, setHost] = useState('');
//   const [shop, setShop] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const h = searchParams?.get('host') || '';
//     const s = searchParams?.get('shop') || '';
//     const code = searchParams?.get('code') || '';
    
//     console.log('URL params:', { host: h, shop: s, code: code });

//     if (h) setHost(h);
//     if (s) setShop(s);

//     // If we have shop but no host/code, we need to start OAuth
//     if (s && !code && !h) {
//       console.log('Starting OAuth flow...');
//       startOAuthFlow(s);
//       return;
//     }

//     // If we have all required params, we're good
//     if (h && s) {
//       setIsLoading(false);
//     } else if (!s) {
//       setError('Missing shop parameter');
//       setIsLoading(false);
//     }
//   }, [searchParams]);

//   const startOAuthFlow = (shopDomain: string) => {
//     const apiKey = process.env.NEXT_PUBLIC_SHOPIFY_API_KEY;
//     const redirectUri = `${window.location.origin}/api/auth/callback`;
//     const scopes = 'read_customers,write_customers,read_orders,read_products';
    
//     const oauthUrl = `https://${shopDomain}/admin/oauth/authorize?` +
//       `client_id=${apiKey}&` +
//       `scope=${scopes}&` +
//       `redirect_uri=${encodeURIComponent(redirectUri)}&` +
//       `state=${Math.random().toString(36).substring(7)}`;
    
//     window.location.href = oauthUrl;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p>Loading Ziovy Loyalty Dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Error</h1>
//           <p className="text-red-600">{error}</p>
//           <p className="mt-2 text-gray-600">
//             Please install the app from your Shopify admin panel.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!host) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p>Authenticating...</p>
//       </div>
//     );
//   }

//   const config = {
//     apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
//     host,
//     forceRedirect: true,
//   };

//   return (
//     <AppBridgeReactProvider config={config}>
//       <PolarisAppProvider i18n={{}}>
//         <TitleBar title="Ziovy Loyalty Dashboard" />
//         <main className="flex flex-col items-center justify-center min-h-screen p-10">
//           <h1 className="text-4xl font-bold mb-4">Ziovy Loyalty Dashboard</h1>
//           <p className="mb-4 text-gray-600">Welcome, store: {shop}</p>
//           <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">
//             <h2 className="text-2xl font-semibold mb-2">Points Stats</h2>
//             <p className="mb-2">Total Points Awarded: 9,230</p>
//             <p>Top Customer: John Doe (1,230 pts)</p>
//             <div className="mt-4 p-4 bg-gray-100 rounded">
//               <h3 className="font-semibold">Debug Info:</h3>
//               <p>Host: {host}</p>
//               <p>Shop: {shop}</p>
//             </div>
//           </div>
//         </main>
//       </PolarisAppProvider>
//     </AppBridgeReactProvider>
//   );
// }

// export default function Page() {
//   return <ClientApp />;
// }


'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function Dashboard() {
  const [shop, setShop] = useState('');
  const [host, setHost] = useState('');
  const [token, setToken] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const shopParam = searchParams?.get('shop');
    const hostParam = searchParams?.get('host');
    const tokenParam = searchParams?.get('token');

    if (shopParam) setShop(shopParam);
    if (hostParam) setHost(hostParam);
    if (tokenParam) setToken(tokenParam);

    if (typeof window !== 'undefined' && shopParam && hostParam) {
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Ziovy Loyalty Dashboard</h1>
      {shop ? (
        <>
          <p className="mb-2">🛍 Connected Store: <strong>{shop}</strong></p>
          <p className="mb-2">🪪 Token: <code>{token || 'N/A'}</code></p>
          <p className="mb-2">🧭 Host: <code>{host || 'N/A'}</code></p>
        </>
      ) : (
        <p className="text-gray-500">Loading URL parameters...</p>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
