import React from "react"

export default function NFTBox({
    price,
    assestAddress,
    tokenId,
    realEstateMarketplaceAddress,
    seller,
}) {
    return (
        <div className="border p-4 rounded-md m-2">
            <h2 className="font-bold">Token ID: {tokenId}</h2>
            <p>Price: {price} ETH</p>
            <p>Seller: {seller}</p>
            <p>Asset Contract: {assestAddress}</p>
            <p>Marketplace: {realEstateMarketplaceAddress}</p>
        </div>
    )
}
