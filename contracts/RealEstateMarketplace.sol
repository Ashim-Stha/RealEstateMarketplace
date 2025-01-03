//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error RealEstateMarketplace__PriceMustnotBeZero();
error RealEstateMarketplace__NotApprovedForMarketplace();
error RealEstateMarketplace__AlreadyListed(address assestAddress, uint256 tokenId);
error RealEstateMarketplace__NotOwner();
error RealEstateMarketplace__NotListed(address assestAddress, uint256 tokenId);
error RealEstateMarketplace__PriceNotMet(address assestAddress, uint256 tokenId, uint256 price);

contract RealEstateMarketplace is ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
    }

    //Events
    event AssestListed(address indexed seller, address indexed assestAddress, uint256 indexed tokenId, uint256 price);
    event AssestBought(address indexed buyer, address indexed assestAddress, uint256 indexed tokenId, uint256 price);

    mapping(address => mapping(uint256 => Listing)) private listings;
    mapping(address => uint256) private proceeds;

    //modifier
    modifier notListed(address assestAddress, uint256 tokenId, address owner) {
        Listing memory listing = listings[assestAddress][tokenId];
        if (listing.price > 0) {
            revert RealEstateMarketplace__AlreadyListed(assestAddress, tokenId);
        }
        _;
    }

    modifier isOwner(address assestAddress, uint256 tokenId, address spender) {
        IERC721 assest = IERC721(assestAddress);
        address owner = assest.ownerOf(tokenId);
        if (spender != owner) {
            revert RealEstateMarketplace__NotOwner();
        }
        _;
    }

    modifier isListed(address assestAddress, uint256 tokenId) {
        Listing memory listing = listings[assestAddress][tokenId];
        if (listing.price <= 0) {
            revert RealEstateMarketplace__NotListed(assestAddress, tokenId);
        }
        _;
    }

    function listAssest(address assestAddress, uint256 tokenId, uint256 price)
        external
        notListed(assestAddress, tokenId, msg.sender)
        isOwner(assestAddress, tokenId, msg.sender)
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

    function buyAssest(address assestAddress, uint256 tokenId)
        external
        payable
        nonReentrant
        isListed(assestAddress, tokenId)
    {
        Listing memory listedAssest = listings[assestAddress][tokenId];
        if (msg.value < listedAssest.price) {
            revert RealEstateMarketplace__PriceNotMet(assestAddress, tokenId, listedAssest.price);
        }
        proceeds[listedAssest.seller] = proceeds[listedAssest.seller] + msg.value;
        delete(listings[assestAddress][tokenId]);
        IERC721(assestAddress).safeTransferFrom(listedAssest.seller, msg.sender, tokenId);
        emit AssestBought(msg.sender, assestAddress, tokenId, listedAssest.price);
    }
}
