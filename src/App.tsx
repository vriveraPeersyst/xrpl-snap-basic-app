import React from 'react';
import ConnectWallet from './components/ConnectWallet';
import SetTrustline from './components/SetTrustline';

const App: React.FC = () => {
  return (
    <div>
      <h1>XRPL Snap Trustline</h1>
      <ConnectWallet />
      <SetTrustline />
    </div>
  );
};

export default App;
