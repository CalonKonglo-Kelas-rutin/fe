import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from '@wagmi/connectors'

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}

// Get your projectId from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true, // Enable SSR support
})

