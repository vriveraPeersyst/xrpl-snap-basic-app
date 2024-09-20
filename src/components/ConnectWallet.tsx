import React, { useState } from 'react';
import type { MetaMaskInpageProvider, RequestArguments } from '@metamask/providers';

// Hardcoded config object (replace with dynamic values as necessary)
const config = {
  snapOrigin: 'npm:@peersyst/xrpl-snap', // Or your local snap URL
};

// MetaMaskRepository Class (defined locally within the same file)
class MetaMaskRepository {
  public provider?: MetaMaskInpageProvider | null;

  // Initialize MetaMask and check for Snap support
  public async onInit() {
    this.provider = await this.getProvider();
    if (!this.provider) {
      throw new Error('MetaMask provider not found or Snaps not supported');
    }
  }

  // Install the XRPL Snap
  public async requestSnap() {
    await this.request({
      method: 'wallet_requestSnaps',
      params: {
        [config.snapOrigin]: {}, // Change to the correct origin (local or npm)
      },
    });
  }

  // Get XRPL account (wallet) from the Snap
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

  // Fetch account info from the XRP Ledger using the Snap
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

  // Helper function to interact with the Snap
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

  // Helper function to check if Snaps are supported
  private async getProvider() {
    if (typeof window === 'undefined') return null;
    if (await this.hasSnapsSupport()) return window.ethereum;
    return null;
  }

  // Check if Snaps are supported in MetaMask
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

  // General method to send requests to MetaMask
  private async request({ method, params }: RequestArguments) {
    if (!this.provider) throw new Error('MetaMask provider not initialized');
    return this.provider.request({ method, params });
  }
}

// React Component
const ConnectWallet: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [evmAccount, setEvmAccount] = useState<string | null>(null);
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);
  const [xrplAccountDetails, setXrplAccountDetails] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const metaMaskRepository = new MetaMaskRepository();

  const connectWallet = async () => {
    try {
      // Step 1: Initialize MetaMask and ensure Snap support
      await metaMaskRepository.onInit();

      const provider = metaMaskRepository.provider;
      if (provider) {
        // Step 2: Request the MetaMask EVM account
        const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];

        if (accounts && accounts.length > 0) {
          setEvmAccount(accounts[0]);
          setConnected(true);

          // Step 3: Install the XRPL Snap if not installed
          await metaMaskRepository.requestSnap();

          // Step 4: Request XRPL Wallet (get XRPL account)
          const xrplWallet = await metaMaskRepository.getWallet();
          if (xrplWallet && xrplWallet.account) {
            setXrplAccount(xrplWallet.account); // Save XRPL account

            // Step 5: Fetch account details from XRP Ledger
            const accountDetails = await metaMaskRepository.getAccountInfo(xrplWallet.account);
            setXrplAccountDetails(accountDetails);
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
      {connected ? (
        <>
          <p>Connected EVM Account: {evmAccount}</p>
          <p>Connected XRPL Account: {xrplAccount ? xrplAccount : 'Fetching...'}</p>
          {xrplAccountDetails && (
            <div>
              <h3>XRPL Account Details</h3>
              <p>Account: {xrplAccountDetails.Account}</p>
              <p>Balance: {xrplAccountDetails.Balance} drops</p>
              <p>Owner Count: {xrplAccountDetails.OwnerCount}</p>
              <p>Sequence: {xrplAccountDetails.Sequence}</p>
              {/* You can display more fields if needed */}
            </div>
          )}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}
    </div>
  );
};

export default ConnectWallet;
