import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';

// Configure supported wallets
export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    // MetaMask (prioritized and first in list)
    injected({
      target: 'metaMask',
    }),
    // Coinbase Wallet
    coinbaseWallet({
      appName: 'PredictHub',
      appLogoUrl: '/favicon.svg',
    }),
    // Rabby wallet
    injected({
      target() {
        return {
          id: 'rabby',
          name: 'Rabby Wallet',
          provider: (window as any).rabby,
        };
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

