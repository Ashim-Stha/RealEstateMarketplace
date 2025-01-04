const { network } = require("hardhat");
const {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  const assestContract = await deployments.get("Assest");
  const assestAdddress = assestContract.address;

  log("----------------------------------------------------");
  const arguments = [assestAdddress];
  const realestatemarketplace = await deploy("RealEstateMarketplace", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(realestatemarketplace.address, arguments);
  }
  log("----------------------------------------------------");
};

module.exports.tags = ["all", "realestatemarketplace"];
