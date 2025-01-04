import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Form, useNotification, Button } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import assestAbi from "../constants/Assest.json"
import realEstateMarketplaceAbi from "../constants/RealEstateMarketplace.json"
import networkMapping from "../constants/networkMapping.json"
import { useEffect, useState } from "react"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    let realEstateMarketplaceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

    let assestAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    const dispatch = useNotification()
    const [proceeds, setProceeds] = useState("0")

    const { runContractFunction } = useWeb3Contract()

    async function approveAndList(data) {
        console.log("Approving...")
        const assestAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const tokenId = data.data[1].inputResult
        const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()

        const approveOptions = {
            abi: assestAbi,
            contractAddress: assestAddress,
            functionName: "approve",
            params: {
                to: realEstateMarketplaceAddress,
                tokenId: tokenId,
            },
        }

        await runContractFunction({
            params: approveOptions,
            onSuccess: (tx) => handleApproveSuccess(tx, assestAddress, tokenId, price),
            onError: (error) => {
                console.log(error)
            },
        })
    }

    async function handleApproveSuccess(tx, assestAddress, tokenId, price) {
        console.log("Ok! Now time to list")
        await tx.wait()
        const listOptions = {
            abi: realEstateMarketplaceAbi,
            contractAddress: realEstateMarketplaceAddress,
            functionName: "listAssest",
            params: {
                tokenId: tokenId,
                price: price,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => console.log(error),
        })
    }

    async function handleListSuccess() {
        dispatch({
            type: "success",
            message: "NFT listing",
            title: "NFT listed",
            position: "topR",
        })
    }

    const handleWithdrawSuccess = () => {
        dispatch({
            type: "success",
            message: "Withdrawing proceeds",
            position: "topR",
        })
    }
    const handleGetTokensSuccess = (result) => {
        const tokenIds = result.map((tokenId) => tokenId.toString())
        console.log("Returned Token IDs as Strings:", tokenIds)
    }

    const handleGetTokenUri = (result) => {
        const tokenIds = result.toString()
        console.log("Returned Token IDs as Strings:", tokenIds)
    }

    async function mintNft(tokenUri, citizenshipId) {
        const listOptions = {
            abi: assestAbi,
            contractAddress: assestAddresss,
            functionName: "mintNft",
            params: {
                tokenUri: "ashim",
                citizenshipId: "7",
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => console.log(error),
        })
    }

    async function setupUI() {
        const returnedProceeds = await runContractFunction({
            params: {
                abi: realEstateMarketplaceAbi,
                contractAddress: realEstateMarketplaceAddress,
                functionName: "getProceeds",
                params: {
                    seller: account,
                },
            },
            onError: (error) => console.log(error),
        })
        if (returnedProceeds) {
            setProceeds(returnedProceeds.toString())
        }
    }

    useEffect(() => {
        setupUI()
    }, [proceeds, account, isWeb3Enabled, chainId])

    return (
        <div className={styles.container}>
            <div className="mt-4">
                <form onSubmit={approveAndList} className="flex flex-col space-y-4">
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter your name"
                            className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            id="price"
                            name="price"
                            type="number"
                            required
                            placeholder="Enter price in ETH"
                            className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            id="location"
                            name="location"
                            type="text"
                            required
                            placeholder="Enter location"
                            className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            id="certificationId"
                            name="certificationId"
                            type="text"
                            required
                            placeholder="Enter certification ID"
                            className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            id="tokenId"
                            name="tokenId"
                            type="number"
                            required
                            placeholder="Enter token ID"
                            className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition duration-200 ease-in-out">
                        Submit
                    </button>
                </form>
            </div>
            <div className="mt-4 text-lg font-semibold text-gray-900">Withdraw {proceeds} proceeds</div>
            {proceeds != "0" ? (
                <Button
                    onClick={() => {
                        const enteredAbi = document.getElementById("abiInput").value;
                        runContractFunction({
                            params: {
                                abi: enteredAbi,
                                contractAddress: realEstateMarketplaceAddress,
                                functionName: "withdrawProceeds",
                                params: {},
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess(),
                        })
                    }}
                    text="Withdraw"
                    type="button"
                    className="mt-4 bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition duration-200 ease-in-out"
                />
            ) : (
                <div className="mt-4 text-red-600">No proceeds detected</div>
            )}

            <Button
                onClick={() => {
                    const tokenUri = document.getElementById("name").value;
                    const citizenshipId = document.getElementById("certificationId").value;
                    runContractFunction({
                        params: {
                            abi: assestAbi,
                            contractAddress: assestAddress,
                            functionName: "mintNft",
                            params: {
                                tokenUri: tokenUri,
                                citizenshipId: citizenshipId,
                            },
                        },
                        onError: (error) => console.log(error),
                        onSuccess: () => handleWithdrawSuccess(),
                    })
                }}
                text="mintNft"
                type="button"
            />

            <Button
                onClick={() => {
                    runContractFunction({
                        params: {
                            abi: assestAbi,
                            contractAddress: assestAddress,
                            functionName: "getTokensByCitizenshipId",
                            params: {
                                citizenshipId: "7",
                            },
                        },
                        onError: (error) => console.log(error),
                        onSuccess: (result) => handleGetTokensSuccess(result),
                    })
                }}
                text="getTokensByCitizenshipId"
                type="button"
            />

<Button
                onClick={() => {
                    const tokenId = document.getElementById("tokenId").value; // Get tokenId from input
                    runContractFunction({
                        params: {
                            abi: assestAbi,
                            contractAddress: assestAddress,
                            functionName: "getTokenUri",
                            params: {
                                tokenId: tokenId, // Use the retrieved tokenId
                            },
                        },
                        onError: (error) => console.log(error),
                        onSuccess: (result) => handleGetTokenUri(result),
                    })
                }}
                text="getTokenUri"
                type="button"
            />

            <Button
                onClick={() => {
                    const tokenId = document.getElementById("tokenId").value; // Get tokenId from input
                    runContractFunction({
                        params: {
                            abi: assestAbi,
                            contractAddress: assestAddress,
                            functionName: "approve",
                            params: {
                                to: add, // Updated to use 'add'
                                tokenId: tokenId, // Updated to use the entered tokenId
                            },
                        },
                        onError: (error) => console.log(error),
                        onSuccess: (result) => handleGetTokenUri(result),
                    })
                }}
                text="approve"
                type="button"
            />
        </div>
    )
}
