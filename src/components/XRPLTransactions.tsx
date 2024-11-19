import React, { useState, useEffect } from 'react';
import { transactionExamples } from './transactionExamples';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

interface XRPLTransactionsProps {
  xrplAccount: string;
}

const XRPLTransactions: React.FC<XRPLTransactionsProps> = ({ xrplAccount }) => {
  const [selectedType, setSelectedType] = useState('');
  const [transactionJSON, setTransactionJSON] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleTransactionTypeChange = (type: string) => {
    setSelectedType(type);
    const example = transactionExamples[type];
    if (example) {
      // Dynamically set the Account field
      setTransactionJSON(JSON.stringify({ ...example, Account: xrplAccount }, null, 2));
    } else {
      setTransactionJSON('');
    }
  };

  const executeTransaction = async () => {
    try {
      const provider = window.ethereum;

      let parsedTransaction;
      try {
        parsedTransaction = JSON.parse(transactionJSON);
      } catch {
        setStatus('Invalid JSON. Please check your input.');
        return;
      }

      const result = await provider.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: 'npm:xrpl-snap',
          request: {
            method: 'xrpl_signAndSubmit',
            params: parsedTransaction,
          },
        },
      });

      setTransactionDetails(result);
      setStatus('success');
      setShowModal(true);
    } catch (error) {
      console.error('Transaction failed:', error);
      setTransactionDetails(error);
      setStatus('error');
    }
  };

  const renderTransactionStatus = () => {
    if (status === 'success') {
      return (
        <div className="p-4 mt-4 bg-green-100 text-green-700 rounded-md">
          <h4 className="text-lg font-bold mb-2">Transaction Successful!</h4>
          <p><strong>Transaction Hash:</strong> {transactionDetails?.result?.tx_json?.hash || 'N/A'}</p>
          <p><strong>Status:</strong> {transactionDetails?.result?.engine_result || 'N/A'}</p>
          <p><strong>Fee:</strong> {transactionDetails?.result?.tx_json?.Fee || 'N/A'}</p>
        </div>
      );
    } else if (status === 'error') {
      return (
        <div className="p-4 mt-4 bg-red-100 text-red-700 rounded-md">
          <h4 className="text-lg font-bold mb-2">Transaction Failed!</h4>
          <p><strong>Error Message:</strong> {transactionDetails?.message || 'An unknown error occurred.'}</p>
          <p><strong>Details:</strong> {JSON.stringify(transactionDetails, null, 2)}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Modal */}
      {showModal && status === 'success' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-green-500 text-lg font-bold">Transaction Successful!</h3>
            <p>Your transaction has been submitted successfully.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Transaction type dropdown */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Transaction Type</label>
        <select
          value={selectedType}
          onChange={(e) => handleTransactionTypeChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select a transaction type</option>
          {Object.keys(transactionExamples).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* JSON editor */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Transaction JSON</label>
        <textarea
          value={transactionJSON}
          onChange={(e) => setTransactionJSON(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={10}
        />
      </div>

      {/* Execute button */}
      <button
        onClick={executeTransaction}
        disabled={!selectedType || !transactionJSON}
        className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        Execute Transaction
      </button>

      {/* Render transaction status */}
      {renderTransactionStatus()}
    </div>
  );
};

export default XRPLTransactions;
