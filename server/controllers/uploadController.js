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
    const { name, description } = req.body; // Extract name and description from request body
    const response = await handleTokenUri(uploadedFiles, name, description); // Pass name and description to handleTokenUri
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred during upload." });
  }
};

const handleTokenUri = async (uploadedFiles, name, description) => {
  const tokenUris = [];
  const { responses: imageUploadResponses, files } = await storeImages(
    uploadedFiles
  );

  for (const imageUploadResponseIndex in imageUploadResponses) {
    let tokenUriMetadata = { ...metadataTemplate };

    // Use the name and description passed from the request body
    tokenUriMetadata.name =
      name ||
      files[imageUploadResponseIndex].replace(/\b.png|\b.jpg|\b.jpeg/, "");
    tokenUriMetadata.description =
      description || `An adorable ${tokenUriMetadata.name} file!`;
    tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`;

    const metadataUploadResponse = await storeTokenUriMetadata(
      tokenUriMetadata
    );
    tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`);
  }

  return { tokenUris };
};

module.exports = { uploadFile };
