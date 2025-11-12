'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        <Button onClick={() => disconnect()} variant="outline" size="sm">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={isPending}
            variant="default"
            size="sm"
          >
            {connector.name}
          </Button>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
