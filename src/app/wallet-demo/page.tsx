'use client';

import { WalletConnect } from '@/components/features/wallet-connect';
import { useWallet } from '@/hooks/use-wallet';
import { useAccount, useBlockNumber, useChainId } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export default function WalletDemo() {
  const { address, isConnected, balance, ensName } = useWallet();
  const chainId = useChainId();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const account = useAccount();

  const chainName = chainId === mainnet.id ? 'Mainnet' : chainId === sepolia.id ? 'Sepolia' : 'Unknown';

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Wagmi + TanStack Query Demo</h1>
          <p className="text-muted-foreground">
            Next.js 16 with wagmi v2 and TanStack Query v5
          </p>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Wallet Connection</h2>
          <WalletConnect />
        </div>

        {isConnected && (
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Account Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Address:</span>
                <span className="font-mono text-sm">{address}</span>
              </div>
              {ensName && (
                <div className="flex justify-between">
                  <span className="font-medium">ENS Name:</span>
                  <span className="text-sm">{ensName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Chain:</span>
                <span className="text-sm">{chainName} ({chainId})</span>
              </div>
              {balance && (
                <div className="flex justify-between">
                  <span className="font-medium">Balance:</span>
                  <span className="text-sm">
                    {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Connector:</span>
                <span className="text-sm">{account.connector?.name}</span>
              </div>
            </div>
          </div>
        )}

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Network Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Current Chain:</span>
              <span className="text-sm">{chainName} ({chainId})</span>
            </div>
            {blockNumber !== undefined && (
              <div className="flex justify-between">
                <span className="font-medium">Latest Block:</span>
                <span className="text-sm font-mono">{blockNumber.toString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Quick Start Guide</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">1. Use wagmi hooks:</h3>
              <pre className="bg-muted p-4 rounded overflow-x-auto">
{`import { useAccount, useBalance } from 'wagmi';

function Component() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  return <div>{balance?.formatted}</div>;
}`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Use custom hook:</h3>
              <pre className="bg-muted p-4 rounded overflow-x-auto">
{`import { useWallet } from '@/hooks/use-wallet';

function Component() {
  const { address, isConnected, balance } = useWallet();
  return <div>{address}</div>;
}`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Write to contract:</h3>
              <pre className="bg-muted p-4 rounded overflow-x-auto">
{`import { useWriteContract } from 'wagmi';

function Component() {
  const { writeContract } = useWriteContract();
  
  const handleWrite = () => {
    writeContract({
      address: '0x...',
      abi: [...],
      functionName: 'transfer',
      args: [to, amount],
    });
  };
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
