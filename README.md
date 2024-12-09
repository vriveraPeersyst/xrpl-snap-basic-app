
# XRPL Snap Basic App

This project demonstrates how to integrate MetaMask Snaps with the XRP Ledger (XRPL) using the XRPL Snap. The app allows users to connect to MetaMask, fetch their XRPL account, and set up a trustline for a token on the XRP Ledger.

## Features

- Connect to MetaMask and request the XRPL Snap.
- Dynamically fetch the connected XRPL account.
- Set up a trustline for a specific token issuer and currency.
- Display status and error messages for the user.

## Installation

### Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/) installed in your browser
- [Git](https://git-scm.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/xrpl-snap-basic-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd xrpl-snap-basic-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and connect to the MetaMask wallet.

## Usage

1. Once the application is running, click the **Connect MetaMask** button to connect your wallet.
2. After connecting MetaMask, your XRPL account will be fetched automatically.
3. Enter the token issuer address, token currency (e.g., USD), and limit amount to set up a trustline.
4. Click **Set Trustline** to establish a trustline on the XRP Ledger.

## Deployment

To deploy the app to GitHub Pages:

1. Install GitHub Pages as a dev dependency:

   ```bash
   npm install gh-pages --save-dev
   ```

2. Add the following scripts to your `package.json` file:

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy the app:

   ```bash
   npm run deploy
   ```

4. Your app will be live at: `https://your-username.github.io/xrpl-snap-basic-app/`.

## License

This project is open-source and available under the [MIT License](LICENSE).