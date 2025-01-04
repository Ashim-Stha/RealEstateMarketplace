const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pinataApiKey = process.env.PINATA_API_KEY || "";
const pinataApiSecret = process.env.PINATA_API_SECRET || "";
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret);

async function storeImages(uploadedFiles) {
  const responses = [];
  console.log("Uploading to IPFS");

  for (const file of uploadedFiles) {
    const filePath = file.path; // Use the path from `req.files`.
    const options = {
      pinataMetadata: {
        name: file.originalname, // Original file name.
      },
    };

    try {
      const readableStreamForFile = fs.createReadStream(filePath);
      const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
      responses.push(result);
    } catch (error) {
      console.log(error);
    }
  }

  return { responses, files: uploadedFiles.map((file) => file.originalname) };
}

async function storeTokenUriMetadata(metadata) {
  const options = {
    pinataMetadata: {
      name: metadata.name,
    },
  };
  try {
    const response = await pinata.pinJSONToIPFS(metadata, options);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}

module.exports = { storeImages, storeTokenUriMetadata };
