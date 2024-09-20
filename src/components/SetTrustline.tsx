import React, { useState, useEffect } from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

// MetaMaskRepository Class (simulating the getWallet method)
class MetaMaskRepository {
  public async getWallet(): Promise<{ account: string } | null> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not available');
    }

    const provider = window.ethereum;

    const result = await provider.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: 'npm:@peersyst/xrpl-snap',
        request: {
          method: 'xrpl_getAccount',
          params: undefined,
        },
      },
    });

    if (result && typeof result === 'object' && 'account' in result) {
      return result as { account: string };
    }

    return null; // If the result is invalid or doesn't have an account
  }
}

const SetTrustline: React.FC = () => {
  const [rAddress, setRAddress] = useState('');
  const [limitAmount, setLimitAmount] = useState('1000');
  const [tokenCurrency, setTokenCurrency] = useState('TOKEN');
  const [status, setStatus] = useState<string | null>(null);
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);

  const metaMaskRepository = new MetaMaskRepository();

  // Function to fetch XRPL Account using MetaMask Snap
  const fetchXRPLAccount = async () => {
    try {
      const wallet = await metaMaskRepository.getWallet();
      if (wallet && wallet.account) {
        setXrplAccount(wallet.account);
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
      if (window.ethereum) {
        const provider = window.ethereum;

        const result = await provider.request({
          method: 'wallet_invokeSnap',
          params: {
            snapId: 'npm:@peersyst/xrpl-snap',
            request: {
              method: 'xrpl_signAndSubmit',
              params: {
                TransactionType: 'TrustSet',
                Account: xrplAccount, // Dynamically set the connected user’s account
                LimitAmount: {
                  currency: tokenCurrency,
                  issuer: rAddress,
                  value: limitAmount,
                },
              },
            },
          },
        });

        setStatus(`Trustline set successfully: ${JSON.stringify(result)}`);
      } else {
        setStatus('MetaMask is not installed.');
      }
    } catch (error) {
      console.error('Error setting trustline:', error);
      setStatus('Error setting trustline.');
    }
  };

  // Fetch the XRPL account when the component mounts
  useEffect(() => {
    fetchXRPLAccount();
  }, []);

  return (
    <div>
      <h3>Set Up Trustline</h3>
      <input
        type="text"
        value={rAddress}
        onChange={(e) => setRAddress(e.target.value)}
        placeholder="Enter Token rAddress"
      />
      <input
        type="text"
        value={limitAmount}
        onChange={(e) => setLimitAmount(e.target.value)}
        placeholder="Enter Limit Amount"
      />
      <input
        type="text"
        value={tokenCurrency}
        onChange={(e) => setTokenCurrency(e.target.value)}
        placeholder="Enter Token Currency (e.g., USD)"
      />
      <button onClick={setupTrustline} disabled={!xrplAccount}>
        {xrplAccount ? 'Set Trustline' : 'Fetching XRPL Account...'}
      </button>

      {status && <p>{status}</p>}
    </div>
  );
};

export default SetTrustline;
