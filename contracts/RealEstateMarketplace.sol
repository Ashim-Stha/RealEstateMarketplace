//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error PriceMustBeAboveZero();
error NotApprovedForMarketplace();
error AlreadyListed(uint256 tokenId);
error NotOwner();
error NotListed(uint256 tokenId);
error PriceNotMet(uint256 tokenId, uint256 price);
error NoProceeds();

contract RealEstateMarketplace is ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
    }

    IERC721 private immutable assestContract;
    mapping(uint256 => Listing) private listings;
    mapping(address => uint256) private proceeds;

    constructor(address _assestContract) {
        assestContract = IERC721(_assestContract);
    }

    modifier notListed(uint256 tokenId) {
        if (listings[tokenId].price > 0) {
            revert AlreadyListed(tokenId);
        }
        _;
    }

    modifier isOwner(uint256 tokenId, address spender) {
        address owner = assestContract.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    modifier isListed(uint256 tokenId) {
        if (listings[tokenId].price <= 0) {
            revert NotListed(tokenId);
        }
        _;
    }

    function listAssest(uint256 tokenId, uint256 price) external notListed(tokenId) isOwner(tokenId, msg.sender) {
        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }

        if (assestContract.getApproved(tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }

        listings[tokenId] = Listing(price, msg.sender);
        emit AssestListed(msg.sender, tokenId, price);
    }

    function buyAssest(uint256 tokenId) external payable nonReentrant isListed(tokenId) {
        Listing memory listedAssest = listings[tokenId];
        if (msg.value < listedAssest.price) {
            revert PriceNotMet(tokenId, listedAssest.price);
        }

        proceeds[listedAssest.seller] += msg.value;
        delete listings[tokenId];
        assestContract.safeTransferFrom(listedAssest.seller, msg.sender, tokenId);

        emit AssestBought(msg.sender, tokenId, listedAssest.price);
    }

    function cancelListing(uint256 tokenId) external isOwner(tokenId, msg.sender) {
        delete listings[tokenId];
        emit AssestCanceled(msg.sender, tokenId);
    }

    function updateListing(uint256 tokenId, uint256 newPrice) external isOwner(tokenId, msg.sender) {
        listings[tokenId].price = newPrice;
        emit AssestListed(msg.sender, tokenId, newPrice);
    }

    function withdrawProceeds() external {
        uint256 proceed = proceeds[msg.sender];
        if (proceed <= 0) {
            revert NoProceeds();
        }

        proceeds[msg.sender] = 0;
        (bool success,) = payable(msg.sender).call{value: proceed}("");
        require(success, "Transfer failed");
    }

    function getListing(uint256 tokenId) external view returns (Listing memory) {
        return listings[tokenId];
    }

    // Events
    event AssestListed(address indexed seller, uint256 indexed tokenId, uint256 price);
    event AssestBought(address indexed buyer, uint256 indexed tokenId, uint256 price);
    event AssestCanceled(address indexed seller, uint256 indexed tokenId);
}
