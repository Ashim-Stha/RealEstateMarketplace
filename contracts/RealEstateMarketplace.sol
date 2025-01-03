//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error RealEstateMarketplace__PriceMustnotBeZero();
error RealEstateMarketplace__NotApprovedForMarketplace();
error RealEstateMarketplace__AlreadyListed(address assestAddress, uint256 tokenId);

contract RealEstateMarketplace {
    struct Listing {
        uint256 price;
        address seller;
    }

    //Events
    event AssestListed(address indexed seller, address indexed assestAdrress, uint256 indexed tokenId, uint256 price);

    mapping(address => mapping(uint256 => Listing)) private listings;

    //modifier
    modifier notListed(address assestAddress, uint256 tokenId, address owner) {
        Listing memory listing = listings[assestAddress][tokenId];
        if (listing.price > 0) {
            revert RealEstateMarketplace__AlreadyListed(assestAddress, tokenId);
        }
        _;
    }

    function listAssest(address assestAddress, uint256 tokenId, uint256 price)
        external
        notListed(assestAddress, tokenId, msg.sender)
    {
        if (price <= 0) {
            revert RealEstateMarketplace__PriceMustnotBeZero();
        }

        IERC721 assest = IERC721(assestAddress);
        if (assest.getApproved(tokenId) != address(this)) {
            revert RealEstateMarketplace__NotApprovedForMarketplace();
        }

        listings[assestAddress][tokenId] = Listing(price, msg.sender);
        emit AssestListed(msg.sender, assestAddress, tokenId, price);
    }
}
