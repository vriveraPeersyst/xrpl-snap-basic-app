import React, { useState } from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

interface CancelTrustlineProps {
  xrplAccount: string;
}

const CancelTrustline: React.FC<CancelTrustlineProps> = ({ xrplAccount }) => {
  const [rAddress, setRAddress] = useState('');
  const [tokenCurrency, setTokenCurrency] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const cancelTrustline = async () => {
    try {
      const provider = window.ethereum;

      const result = await provider.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: 'npm:@peersyst/xrpl-snap',
          request: {
            method: 'xrpl_signAndSubmit',
            params: {
              TransactionType: 'TrustSet',
              Account: xrplAccount,
              LimitAmount: {
                currency: tokenCurrency,
                issuer: rAddress,
                value: '0', // Always set to '0' for cancelling trustline
              },
            },
          },
        },
      });

      setStatus(`Trustline cancelled successfully: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error('Error cancelling trustline:', error);
      setStatus('Error cancelling trustline.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Cancel Trustline</h3>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Token rAddress</label>
        <input
          type="text"
          value={rAddress}
          onChange={(e) => setRAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Token rAddress"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Token Currency</label>
        <input
          type="text"
          value={tokenCurrency}
          onChange={(e) => setTokenCurrency(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Token Currency"
        />
      </div>
      <button
        onClick={cancelTrustline}
        className="w-full py-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
      >
        Cancel Trustline
      </button>
      {status && <p className="mt-4 text-center text-red-500">{status}</p>}
    </div>
  );
};

export default CancelTrustline;