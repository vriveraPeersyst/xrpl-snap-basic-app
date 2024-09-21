import React, { useState } from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

// Utility function to convert currency string to 40-character hex if needed
const convertCurrencyToHex = (currency: string): string => {
  if (/^[A-Fa-f0-9]{40}$/.test(currency)) return currency;
  if (currency.length === 3) return currency;
  
  const currencyHex = Buffer.from(currency, 'utf8').toString('hex').toUpperCase();
  return currencyHex.padEnd(40, '0');
};

const SetTrustline: React.FC = () => {
  const [rAddress, setRAddress] = useState('');
  const [limitAmount, setLimitAmount] = useState('1000');
  const [tokenCurrency, setTokenCurrency] = useState('TOKEN');
  const [status, setStatus] = useState<string | null>(null);
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);

  // Fetch XRPL Account using MetaMask Snap
  const fetchXRPLAccount = async () => {
    const provider = window.ethereum;

    try {
      const wallet = await provider.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: 'npm:@peersyst/xrpl-snap',
          request: {
            method: 'xrpl_getAccount',
            params: undefined,
          },
        },
      });

      if (wallet && typeof wallet === 'object' && 'account' in wallet) {
        setXrplAccount(wallet.account as string);
      } else {
        setStatus('Failed to fetch XRPL account.');
      }
    } catch (error) {
      console.error('Error fetching XRPL account:', error);
      setStatus('Error fetching XRPL account.');
    }
  };

  const setupTrustline = async () => {
    if (!xrplAccount) {
      setStatus('XRPL account is not available.');
      return;
    }

    try {
      const provider = window.ethereum;
      const currencyHex = convertCurrencyToHex(tokenCurrency);

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
                currency: currencyHex,
                issuer: rAddress,
                value: limitAmount,
              },
            },
          },
        },
      });

      setStatus(`Trustline set successfully: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error('Error setting trustline:', error);
      setStatus('Error setting trustline.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Set Up Trustline</h3>
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
        <label className="block text-gray-700 mb-2">Limit Amount</label>
        <input
          type="text"
          value={limitAmount}
          onChange={(e) => setLimitAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Limit Amount"
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
        onClick={setupTrustline}
        className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Set Trustline
      </button>
      {status && <p className="mt-4 text-center text-red-500">{status}</p>}
    </div>
  );
};

export default SetTrustline;
