import React, { useState } from 'react';
import type { MetaMaskInpageProvider, RequestArguments } from '@metamask/providers';

// Hardcoded config object (replace with dynamic values as necessary)
const config = {
  snapOrigin: 'npm:@peersyst/xrpl-snap', // Or your local snap URL
};

// MetaMaskRepository Class (defined locally within the same file)
class MetaMaskRepository {
  public provider?: MetaMaskInpageProvider | null;

  public async onInit() {
    this.provider = await this.getProvider();
    if (!this.provider) {
      throw new Error('MetaMask provider not found or Snaps not supported');
    }
  }

  public async requestSnap() {
    await this.request({
      method: 'wallet_requestSnaps',
      params: {
        [config.snapOrigin]: {}, // Change to the correct origin (local or npm)
      },
    });
  }

  public async getWallet(): Promise<{ account: string } | null> {
    const result = await this.invokeSnap({
      method: 'xrpl_getAccount',
      params: undefined,
    });

    if (result && typeof result === 'object' && 'account' in result) {
      return result as { account: string };
    }

    return null; // If the result is invalid or doesn't have an account
  }

  public async getAccountInfo(account: string): Promise<any & { signer_lists?: any[] }> {
    const { result } = (await this.invokeSnap({
      method: 'xrpl_request',
      params: { command: 'account_info', account },
    })) as { result: { account_data?: any } };

    if (result?.account_data) {
      return result.account_data;
    }
    throw new Error('Account not found');
  }

  private async invokeSnap({ method, params }: { method: string; params: any }) {
    return this.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: config.snapOrigin,
        request: {
          method,
          params,
        },
      },
    });
  }

  private async getProvider() {
    if (typeof window === 'undefined') return null;
    if (await this.hasSnapsSupport()) return window.ethereum;
    return null;
  }

  private async hasSnapsSupport(provider: MetaMaskInpageProvider = window.ethereum): Promise<boolean> {
    try {
      await provider.request({
        method: 'wallet_getSnaps',
      });
      return true;
    } catch {
      return false;
    }
  }

  private async request({ method, params }: RequestArguments) {
    if (!this.provider) throw new Error('MetaMask provider not initialized');
    return this.provider.request({ method, params });
  }
}

interface ConnectWalletProps {
  onConnect: (xrplAccount: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  const [connected, setConnected] = useState(false);
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const metaMaskRepository = new MetaMaskRepository();

  const connectWallet = async () => {
    try {
      await metaMaskRepository.onInit();

      const provider = metaMaskRepository.provider;
      if (provider) {
        const accounts = (await provider.request({
          method: 'eth_requestAccounts',
        })) as string[];

        if (accounts && accounts.length > 0) {
          await metaMaskRepository.requestSnap();

          const xrplWallet = await metaMaskRepository.getWallet();
          if (xrplWallet && xrplWallet.account) {
            setXrplAccount(xrplWallet.account);
            setConnected(true);
            onConnect(xrplWallet.account); // Pass XRPL account to parent component
          } else {
            setErrorMessage('Failed to retrieve XRPL account.');
          }
        } else {
          setErrorMessage('No EVM accounts found');
        }
      } else {
        setErrorMessage('MetaMask provider not initialized');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setErrorMessage('Error connecting to MetaMask');
    }
  };

  return (
    <div>
      {!connected ? (
        <button
          onClick={connectWallet}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          <span className="text-lg font-semibold">Connect XRPL MetaMask Snap</span>
        </button>
      ) : (
        <div className="text-center">
          <p>Connected XRPL Account: {xrplAccount}</p>
        </div>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default ConnectWallet;