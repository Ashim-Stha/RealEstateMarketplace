//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Assest is ERC721URIStorage {
    uint256 private tokenCounter;
    mapping(string => uint256[]) private citizenshipIdToAssestIds;
    //mapping(string => bool) private mintedAssestId;

    constructor() ERC721("Assest", "A") {}

    function mintNft(string memory tokenUri, string memory citizenshipId) public {
        //require(!mintedAssestId[citizenshipId], "Token already minted for this assest");
        tokenCounter += 1;
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, tokenUri);
        citizenshipIdToAssestIds[citizenshipId].push(tokenCounter);
        //mintedAssestId[citizenshipId] = true;
    }
}
