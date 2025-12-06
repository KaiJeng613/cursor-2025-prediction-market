import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';

// Configure supported wallets
export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    // MetaMask and other injected wallets
    injected({
      target: 'metaMask',
    }),
    // Rabby wallet (also uses injected provider)
    injected({
      target() {
        return {
          id: 'rabby',
          name: 'Rabby Wallet',
          provider: (window as any).rabby,
        };
      },
    }),
    // Coinbase Wallet
    coinbaseWallet({
      appName: 'PredictHub',
      appLogoUrl: '/favicon.svg',
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

