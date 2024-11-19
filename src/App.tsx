import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import SetTrustline from './components/SetTrustline';
import CancelTrustline from './components/CancelTrustline';
import XRPLTransactions from './components/XRPLTransactions';
import xrplLogo from './assets/xrplsnaplogo1.png';

const App: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleConnect = (xrplAccount: string) => {
    setXrplAccount(xrplAccount);
    setConnected(true);
  };

  const renderContent = () => {
    if (!connected) {
      return <ConnectWallet onConnect={handleConnect} />;
    }

    if (selectedOption === 'XRPLTransactions') {
      return <XRPLTransactions xrplAccount={xrplAccount!} />;
    }

    return (
      <div className="text-center">
        <p className="mb-4">Connected XRPL Account: {xrplAccount}</p>
        <h2 className="text-2xl font-bold mb-4">Select an Option</h2>
        <button
          onClick={() => setSelectedOption('XRPLTransactions')}
          className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          XRPL Transactions
        </button>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Logo in top left corner */}
      <div className="absolute top-[3%] left-[3%]">
        <a href="http://localhost:3000">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
            <img src={xrplLogo} alt="XRPL Snap Logo" className="w-full h-full object-cover" />
          </div>
        </a>
      </div>
  
      {/* Main content */}
      {renderContent()}
    </div>
  );
};

export default App;