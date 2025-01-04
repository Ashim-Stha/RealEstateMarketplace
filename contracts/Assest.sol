//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Assest is ERC721URIStorage {
    uint256 private tokenCounter;
    mapping(string => uint256[]) private citizenshipIdToAssestIds;

    constructor() ERC721("Assest", "A") {}

    function mintNft(string memory tokenUri, string memory citizenshipId) public {
        tokenCounter += 1;
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, tokenUri);
        citizenshipIdToAssestIds[citizenshipId].push(tokenCounter);
    }

    function getTokensByCitizenshipId(string memory citizenshipId) external view returns (uint256[] memory tokenIds) {
        return citizenshipIdToAssestIds[citizenshipId];
    }

    function getTokenUri(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }
}
