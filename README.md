+++

XRPL Snap Basic App
This project demonstrates how to integrate MetaMask Snaps with the XRP Ledger (XRPL) to manage trustlines and interact with accounts. The app allows users to connect their MetaMask wallet, fetch their XRP Ledger account, and set up trustlines dynamically.

Features
MetaMask Snap Integration: Utilizes the XRPL Snap to connect with the XRP Ledger through MetaMask.
Dynamic Trustline Setup: Allows users to dynamically set up trustlines using their XRPL account.
Account Information: Fetches and displays the XRPL account connected via MetaMask Snap.
Project Structure
SetTrustline.tsx: Component to set up a trustline using a dynamically fetched XRPL account.
MetaMaskRepository: Utility class to interact with MetaMask Snap and fetch XRPL account details.
Getting Started
Prerequisites
Before you can use the app, make sure you have:

Node.js (v14 or higher)
MetaMask installed in your browser
A MetaMask Snap for XRP Ledger installed (npm:@peersyst/xrpl-snap)
Installation
Clone the repository:

+++bash git clone https://github.com/your-username/xrpl-snap-basic-app.git +++

Navigate to the project directory:

+++bash cd xrpl-snap-basic-app +++

Install dependencies:

+++bash npm install +++

Running the App Locally
To run the app locally on your machine:

Start the development server:

+++bash npm start +++

Open your browser and go to http://localhost:3000.

Usage
Connect MetaMask: Ensure MetaMask is installed and configured. Open MetaMask and make sure the XRP Ledger Snap is installed.
Set Trustline:
Enter the issuer's address, token currency (e.g., USD), and the limit amount in the input fields.
Click "Set Trustline" to create the trustline with the specified parameters.
MetaMask Snap Setup
To install the XRP Ledger Snap on MetaMask, follow these steps:

Open MetaMask.
Go to Settings > Snaps and search for the XRP Ledger Snap.
Install the Snap to interact with the XRPL.
Deployment
Configuring GitHub Pages
In the package.json, make sure the homepage field is correctly configured:

+++json "homepage": "https://your-username.github.io/xrpl-snap-basic-app/" +++

To deploy the app:

+++bash npm run deploy +++

Your app will be available at https://your-username.github.io/xrpl-snap-basic-app/.

Available Scripts
In the project directory, you can run:

npm start: Runs the app in development mode. Open http://localhost:3000 to view it in the browser.
npm run build: Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.
npm run deploy: Builds and deploys the app to GitHub Pages.
Documentation
For more detailed documentation on MetaMask Snaps and XRPL Snap, refer to the following:

XRPL Snap Official Documentation: https://snap-docs.xrplevm.org/
Additional XRPL Snap API Docs: https://docs.xrplsnap.com/
Custom GPT Assistant
If you need further assistance with integrating XRPL Snap into MetaMask or setting up your dApp, you can use the custom GPT assistant for detailed guidance:

XRPL MetaMask Snap Integration Assistant: https://chatgpt.com/g/g-NJuynjNpi-xrpl-metamask-snap-integration-assistant
Contributing
Feel free to fork the repository and submit pull requests if you would like to contribute. Make sure to follow the project's code style and best practices.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Key Additions:
Documentation Links:

Added links to the XRPL Snap official documentation (snap-docs.xrplevm.org) and API documentation (docs.xrplsnap.com).
Custom GPT Assistant:

Included a link to the custom GPT assistant (XRPL MetaMask Snap Integration Assistant) to provide further guidance on integration. +++
