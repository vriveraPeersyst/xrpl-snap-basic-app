import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import SetTrustline from './components/SetTrustline';
import CancelTrustline from './components/CancelTrustline';
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

    if (selectedOption === 'SetTrustline') {
      return <SetTrustline />;
    }

    if (selectedOption === 'CancelTrustline') {
      return <CancelTrustline xrplAccount={xrplAccount!} />;
    }

    return (
      <div className="text-center">
        <p className="mb-4">Connected XRPL Account: {xrplAccount}</p>
        <h2 className="text-2xl font-bold mb-4">Select an Option</h2>
        <button
          onClick={() => setSelectedOption('SetTrustline')}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 mb-4"
        >
          Set Trustline
        </button>
        <button
          onClick={() => setSelectedOption('CancelTrustline')}
          className="w-full py-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Cancel Trustline
        </button>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Logo in top left corner */}
      <div className="absolute top-[13%] left-[13%]">
        <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-300">
          <img src={xrplLogo} alt="XRPL Snap Logo" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main content */}
      {renderContent()}
    </div>
  );
};

export default App;
