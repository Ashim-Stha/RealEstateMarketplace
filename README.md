# RealEstateMarketplace

## Overview

RealEstateMarketplace is a decentralized application (dApp) that allows users to mint, list, buy, and sell real estate assets as NFTs (Non-Fungible Tokens) on the Ethereum blockchain. The project leverages smart contracts, IPFS for decentralized storage, and a frontend built with Next.js and Tailwind CSS.

## Features

- **Mint NFTs**: Users can mint new real estate NFTs by providing metadata and images.
- **List NFTs**: Users can list their real estate NFTs for sale on the marketplace.
- **Buy NFTs**: Users can purchase listed real estate NFTs.
- **Cancel Listings**: Users can cancel their listings.
- **Update Listings**: Users can update the price of their listed NFTs.
- **View Listings**: Users can view all listed real estate NFTs.

## Project Structure

```
blockchain/
  contracts/
    Assest.sol
    RealEstateMarketplace.sol
  deploy/
    00-deploy-assest.js
    01-deploy-realestatemarketplace.js
  utils/
    verify.js
  hardhat.config.js
  helper-hardhat-config.js
frontend/
  components/
    Footer.js
    Header.js
    NFTBox.js
    UpdateListingModal.js
  constants/
    RealEstateMarketplace.json
    Assest.json
    networkMapping.json
    subgraphQueries.js
  pages/
    index.js
    sell-nft.js
    OwnerDetailForm.js
    property-Listing.js
    graphExample.js
  styles/
    Home.module.css
    globals.css
  addEvents.js
  next.config.js
  tailwind.config.js
  package.json
server/
  controllers/
    uploadController.js
  middleware/
    multer.js
    uploadToPinata.js
  routes/
    uploadRoute.js
  index.js
  package.json
```

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Hardhat
- Metamask (for interacting with the dApp)

### Backend (Blockchain)

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd blockchain
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Compile the smart contracts:
   ```sh
   yarn hardhat compile
   ```

4. Deploy the smart contracts:
   ```sh
   yarn hardhat deploy --network <network-name>
   ```

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a .env file and add your environment variables:
   ```sh
   cp .env.example .env
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

### Server

1. Navigate to the server directory:
   ```sh
   cd server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a .env file and add your environment variables:
   ```sh
   cp .env.example .env
   ```

4. Start the server:
   ```sh
   node index.js
   ```

## Frontend Integration with Blockchain

The frontend interacts with the blockchain using the `react-moralis` library to connect to the Ethereum network and execute smart contract functions. The integration involves the following steps:

1. **Connecting to the Wallet**: The frontend uses Metamask to connect to the user's Ethereum wallet.
2. **Executing Smart Contract Functions**: The `useWeb3Contract` hook from `react-moralis` is used to call smart contract functions such as minting NFTs, listing items, and buying items.
3. **Handling Responses**: The frontend handles the responses from the smart contract functions, updating the UI accordingly.

Example of minting an NFT:
```javascript
const handleMintNft = (data) => {
    const tokenUri = data.data[0].inputResult;
    const citizenshipId = parseInt(data.data[1].inputResult);

    runContractFunction({
        params: {
            abi: assestAbi,
            contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            functionName: "mintNft",
            params: {
                tokenUri: tokenUri,
                citizenshipId: citizenshipId,
            },
        },
        onSuccess: () => alert("NFT Minted Successfully!"),
        onError: (error) => console.log(error),
    });
};
```

## Server

The server part of the application handles file uploads and interacts with IPFS through Pinata for decentralized storage. It uses Express.js for handling HTTP requests.

### Routes

- **POST /upload**: This route handles file uploads. It uses the `multer` middleware to handle file uploads and the `uploadController` to process the uploaded files.

### Middleware

- **multer.js**: Configures the `multer` middleware for handling file uploads.
- **uploadToPinata.js**: Contains functions for uploading files and metadata to Pinata.

### Controllers

- **uploadController.js**: Contains the logic for processing uploaded files and storing them on IPFS via Pinata.


## Usage

1. Open the frontend application in your browser.
2. Connect your Metamask wallet.
3. Use the provided forms to mint, list, buy, and manage real estate NFTs.

## Smart Contracts

- **Assest.sol**: Implements the ERC721 standard for minting and managing real estate NFTs.
- **RealEstateMarketplace.sol**: Implements the marketplace functionality for listing, buying, and managing real estate NFTs.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.


