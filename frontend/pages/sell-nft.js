import { Button, Form } from "web3uikit"
import { useWeb3Contract } from "react-moralis"
import { useState } from "react"
import assestAbi from "../constants/Assest.json"
import realEstateMarketplaceAbi from "../constants/RealEstateMarketplace.json"

export default function Home() {
    const { runContractFunction } = useWeb3Contract()

    // State for tokens, loading, and error
    const [tokens, setTokens] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleMintNft = (data) => {
        const tokenUri = data.data[0].inputResult // Get Token URI
        const citizenshipId = parseInt(data.data[1].inputResult) // Get Citizenship ID

        runContractFunction({
            params: {
                abi: assestAbi,
                contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                functionName: "mintNft",
                params: {
                    tokenUri: tokenUri,
                    citizenshipId: citizenshipId,
                },
            },
            onSuccess: () => alert("NFT Minted Successfully!"),
            onError: (error) => console.log(error),
        })
    }

    const handleGetTokensByCitizenshipId = (data) => {
        const citizenshipId = parseInt(data.data[0].inputResult)

        setLoading(true) // Set loading state to true while fetching data
        setError(null) // Reset error state

        runContractFunction({
            params: {
                abi: assestAbi,
                contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                functionName: "getTokensByCitizenshipId",
                params: {
                    citizenshipId: citizenshipId,
                },
            },
            onSuccess: (result) => {
                console.log("Returned Token IDs: ", result.toString())
                setTokens(result) // Update the tokens state with the result
                setLoading(false) // Set loading state to false after the result is received
            },
            onError: (error) => {
                console.log(error)
                setError("Failed to fetch tokens") // Set error message
                setLoading(false) // Set loading state to false in case of error
            },
        })
    }

    const handleGetTokenUri = (data) => {
        const tokenId = parseInt(data.data[0].inputResult)

        runContractFunction({
            params: {
                abi: assestAbi,
                contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                functionName: "getTokenUri",
                params: { tokenId },
            },
            onSuccess: (result) => console.log("Token URI: ", result),
            onError: (error) => console.log(error),
        })
    }

    const handleApprove = (data) => {
        const tokenId = parseInt(data.data[0].inputResult)

        runContractFunction({
            params: {
                abi: assestAbi,
                contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                functionName: "approve",
                params: {
                    to: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
                    tokenId: tokenId,
                },
            },
            onSuccess: () => alert("Approval Successful!"),
            onError: (error) => console.log(error),
        })
    }

    const handleListItem = (data) => {
        const tokenId = parseInt(data.data[0].inputResult)
        const price = parseInt(data.data[1].inputResult)

        runContractFunction({
            params: {
                abi: realEstateMarketplaceAbi,
                contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
                functionName: "listItem",
                params: { tokenId, price },
            },
            onSuccess: () => alert("Item Listed Successfully!"),
            onError: (error) => console.log(error),
        })
    }

    const handleBuyItem = (data) => {
        const tokenId = parseInt(data.data[0].inputResult)
        const price = parseInt(data.data[1].inputResult)

        runContractFunction({
            params: {
                abi: realEstateMarketplaceAbi,
                contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
                functionName: "buyItem",
                msgValue: price,
                params: { tokenId },
            },
            onSuccess: () => alert("Item Bought!"),
            onError: (error) => console.log(error),
        })
    }

    const handleCancelListing = (data) => {
        const tokenId = parseInt(data.data[0].inputResult)

        runContractFunction({
            params: {
                abi: realEstateMarketplaceAbi,
                contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
                functionName: "cancelListing",
                params: { tokenId },
            },
            onSuccess: () => alert("Listing Canceled!"),
            onError: (error) => console.log(error),
        })
    }

    const handleUpdateListing = (data) => {
        const tokenId = parseInt(data.data[0].inputResult)
        const newPrice = parseInt(data.data[1].inputResult)

        runContractFunction({
            params: {
                abi: realEstateMarketplaceAbi,
                contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
                functionName: "updateListing",
                params: { tokenId, newPrice },
            },
            onSuccess: () => alert("Listing Updated!"),
            onError: (error) => console.log(error),
        })
    }

    return (
        <div>
            {/* Mint NFT Form */}
            <Form
                onSubmit={handleMintNft}
                data={[
                    { name: "Token URI", type: "text", value: "" },
                    { name: "Citizenship ID", type: "number", value: "" },
                ]}
                title="Mint NFT"
            />

            {/* Get Tokens by Citizenship ID */}
            <Form
                onSubmit={handleGetTokensByCitizenshipId}
                data={[{ name: "Citizenship ID", type: "number", value: "" }]}
                title="Get Tokens by Citizenship ID"
            />

            {/* Show Tokens or Loading State */}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {tokens.length > 0 && (
                <div>
                    <h3>Tokens for Citizenship ID:</h3>
                    <ul>
                        {tokens.map((tokenId, index) => (
                            <li key={index}>Token ID: {tokenId.toString()}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Get Token URI */}
            <Form
                onSubmit={handleGetTokenUri}
                data={[{ name: "Token ID", type: "number", value: "" }]}
                title="Get Token URI"
            />

            {/* Approve Form */}
            <Form
                onSubmit={handleApprove}
                data={[{ name: "Token ID", type: "number", value: "" }]}
                title="Approve"
            />

            {/* List Item Form */}
            <Form
                onSubmit={handleListItem}
                data={[
                    { name: "Token ID", type: "number", value: "" },
                    { name: "Price (in ETH)", type: "number", value: "" },
                ]}
                title="List Item"
            />

            {/* Buy Item Form */}
            <Form
                onSubmit={handleBuyItem}
                data={[
                    { name: "Token ID", type: "number", value: "" },
                    { name: "Price (in ETH)", type: "number", value: "" },
                ]}
                title="Buy Item"
            />

            {/* Cancel Listing Form */}
            <Form
                onSubmit={handleCancelListing}
                data={[{ name: "Token ID", type: "number", value: "" }]}
                title="Cancel Listing"
            />

            {/* Update Listing Form */}
            <Form
                onSubmit={handleUpdateListing}
                data={[
                    { name: "Token ID", type: "number", value: "" },
                    { name: "New Price (in ETH)", type: "number", value: "" },
                ]}
                title="Update Listing"
            />
        </div>
    )
}
