const {
  storeImages,
  storeTokenUriMetadata,
} = require("../middleware/uploadToPinata");

const metadataTemplate = {
  citizenshipId: "",
  name: "",
  image: "",
};

const uploadFile = async (req, res) => {
  console.log(req.files);
  const response = await handleTokenUri();
  console.log(response);
  console.log(response.tokenUris[0].citizenshipId);
  console.log(response.tokenUris[0].ipfshash);
  console.log(response.tokenUris[1].citizenshipId);
  console.log(response.tokenUris[1].ipfshash);
  return res.json(response);
};

const handleTokenUri = async () => {
  let tokenUris = [];
  try {
    const { responses: imageUploadResponses, files } = await storeImages();
    for (const index in imageUploadResponses) {
      let tokenUriMetadata = { ...metadataTemplate };
      tokenUriMetadata.name = files[index];
      tokenUriMetadata.citizenshipId = index;
      tokenUriMetadata.image = `ipfs://${imageUploadResponses[index].IpfsHash}`;

      console.log(`Uploading ${tokenUriMetadata.name}`);
      const metadataUploadResponse = await storeTokenUriMetadata(
        tokenUriMetadata
      );
      tokenUris.push({
        name: tokenUriMetadata.name,
        citizenshipId: tokenUriMetadata.citizenshipId,
        ipfshash: `ipfs://${metadataUploadResponse.IpfsHash}`,
      });
    }

    return { tokenUris };
  } catch (e) {
    console.log(e);
    return { e };
  }
};

module.exports = { uploadFile };
