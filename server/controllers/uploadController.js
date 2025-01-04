const {
  storeImages,
  storeTokenUriMetadata,
} = require("../middleware/uploadToPinata");

const metadataTemplate = {
  name: "",
  description: "",
  image: "",
  attributes: [],
};

const uploadFile = async (req, res) => {
  try {
    const uploadedFiles = req.files.front; // Get files uploaded for the "front" field.
    const response = await handleTokenUri(uploadedFiles); // Pass files directly.
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred during upload." });
  }
};

const handleTokenUri = async (uploadedFiles) => {
  const tokenUris = [];
  const { responses: imageUploadResponses, files } = await storeImages(
    uploadedFiles
  );

  for (const imageUploadResponseIndex in imageUploadResponses) {
    let tokenUriMetadata = { ...metadataTemplate };
    tokenUriMetadata.name = files[imageUploadResponseIndex].replace(
      /\b.png|\b.jpg|\b.jpeg/,
      ""
    );
    tokenUriMetadata.description = `An adorable ${tokenUriMetadata.name} file!`;
    tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`;

    const metadataUploadResponse = await storeTokenUriMetadata(
      tokenUriMetadata
    );
    tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`);
  }

  return { tokenUris };
};

module.exports = { uploadFile };
