# XRPL MetaMask Snap React App

This repository contains a **React** application bootstrapped with **Create React App** and **TypeScript**, demonstrating how to integrate the [XRPL MetaMask Snap](https://github.com/ximinez/metamask-snap-developer-guide) functionality. The app allows users to connect their **XRPL** account through MetaMask, display their account, and submit various types of XRPL transactions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
  - [Starting the Development Server](#starting-the-development-server)
  - [Connecting the XRPL Snap](#connecting-the-xrpl-snap)
  - [Submitting Transactions](#submitting-transactions)
  - [Testing](#testing)
  - [Building for Production](#building-for-production)
- [Tailwind CSS Configuration](#tailwind-css-configuration)
- [Utility Scripts](#utility-scripts)
  - [extract_all_files.sh](#extract_all_filessh)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project demonstrates a simple user flow for interacting with the **XRPL** through MetaMask using the XRPL Snap. Users can:

1. **Connect** their MetaMask wallet (with XRPL Snap installed).
2. **Select** an XRPL transaction type (e.g., Payment, TrustSet, OfferCreate, etc.).
3. **Edit** the JSON for the chosen transaction in a text area.
4. **Sign** and **submit** the transaction to the XRPL main or test network (depending on how the snap is configured).

The core components are:

- **`ConnectWallet.tsx`**: Manages MetaMask connection, requests the XRPL Snap, and retrieves the XRPL account address.
- **`XRPLTransactions.tsx`**: Provides a dropdown for transaction types and a text area to review/edit transaction JSON, then invokes the snap for signing and submission.
- **`transactionExamples.ts`**: A collection of example XRPL transaction types to bootstrap the user interface.

---

## Features

- **MetaMask XRPL Snap Integration**: Shows how to request the snap and call its methods.
- **Tailwind CSS**: Quickly style UI with a utility-first CSS framework.
- **TypeScript**: Provides type safety throughout the project.
- **Create React App**: Standard build scripts and development environment.
- **Transaction Examples**: Prebuilt JSON templates for various XRPL transaction types.

---

## Project Structure

```
.
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── xrplsnaplogo1.png
├── src/
│   ├── assets/
│   │   └── xrplsnaplogo1.png
│   ├── components/
│   │   ├── ConnectWallet.tsx
│   │   ├── XRPLTransactions.tsx
│   │   └── transactionExamples.ts
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── .gitignore
└── extract_all_files.sh
```

### Key Files

- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`extract_all_files.sh`**: Shell script to collect all non-binary/text files into a single output file (excluding certain directories and files).
- **`public/index.html`**: The main HTML file used by Create React App.
- **`src/index.tsx`**: Entry point of the React application.
- **`src/App.tsx`**: The main React component that ties everything together.
- **`src/components/ConnectWallet.tsx`**: Handles MetaMask and XRPL Snap connection.
- **`src/components/XRPLTransactions.tsx`**: Allows the user to edit and submit XRPL transactions.
- **`src/components/transactionExamples.ts`**: Houses predefined JSON examples for XRPL transactions.

---

## Installation

1. **Clone** the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. **Navigate** to the project directory:
   ```bash
   cd your-repo-name
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

---

## Usage

### Starting the Development Server

To start the development server on [http://localhost:3000](http://localhost:3000):

```bash
npm start
```
or
```bash
yarn start
```

### Connecting the XRPL Snap

1. **Install MetaMask** (if you haven't already).  
2. **Enable Snaps support** in MetaMask (this feature might still be in beta, so ensure you're running a version of MetaMask that supports snaps).  
3. When you click **Connect XRPL MetaMask Snap**, the app will:
   - Request your MetaMask EVM accounts.
   - Prompt MetaMask to install the XRPL Snap (`npm:xrpl-snap`), if not already installed.
   - Retrieve your XRPL address from the snap.

### Submitting Transactions

1. Once connected, select a **transaction type** from the dropdown (e.g., `Payment`, `TrustSet`, etc.).
2. The corresponding **transaction JSON** is auto-populated, but you can modify it if needed.
3. Click **Execute Transaction** to sign and submit the transaction.  
4. A success or error message will appear, indicating the result of the submission.

### Testing

This project uses the default **Jest** setup from Create React App. To run tests:

```bash
npm test
```
or
```bash
yarn test
```

### Building for Production

Build a production-ready bundle by running:

```bash
npm run build
```
or
```bash
yarn build
```

The output will be placed in the `build/` directory. You can then serve the contents of `build/` using your preferred hosting solution.

---

## Tailwind CSS Configuration

This project uses **Tailwind CSS** for styling, with the configuration defined in:
- **`tailwind.config.js`**
- **`src/index.css`** (to include Tailwind's base, components, and utilities)

Any additional Tailwind customization (colors, plugins, etc.) can be added to `tailwind.config.js` under the `theme.extend` object.

---

## Utility Scripts

### `extract_all_files.sh`

A simple shell script that collects the text content of all files in the repository (excluding `.git`, `node_modules`, `package-lock.json`, and itself), concatenating them into a single file named `all_files_except_package_lock_and_git.txt`.

Usage:
```bash
chmod +x extract_all_files.sh
./extract_all_files.sh
```

The script is helpful if you need a single text file of your project’s source (I use it to give AI context).

---

## Contributing

Contributions are welcome! If you wish to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and open a pull request.

---

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute as per the license terms. If you distribute changes, we’d appreciate attribution back to this original repository.

---

Happy hacking and enjoy exploring the **XRPL** via MetaMask Snaps! If you encounter any issues or have suggestions, feel free to open an issue or pull request.