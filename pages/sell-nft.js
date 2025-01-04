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
            <Form
                onSubmit={approveAndList}
                data={[
                    {
                        name: "NFT Address",
                        type: "text",
                        inputWidth: "50%",
                        value: "",
                        key: "assestAddress",
                    },
                    {
                        name: "Token ID",
                        type: "number",
                        value: "",
                        key: "tokenId",
                    },
                    {
                        name: "Price (in ETH)",
                        type: "number",
                        value: "",
                        key: "price",
                    },
                ]}
                title="Sell your NFT!"
                id="Main Form"
            />
            <div>Withdraw {proceeds} proceeds</div>
            {proceeds != "0" ? (
                <Button
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: realEstateMarketplaceAbi,
                                contractAddress: realEstateMarketplaceAddress,
                                functionName: "withdrawProceeds",
                                params: {},
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess,
                        })
                    }}
                    text="Withdraw"
                    type="button"
                />
            ) : (
                <div>No proceeds detected</div>
            )}

            <Button
                onClick={() => {
                    runContractFunction({
                        params: {
                            abi: assestAbi,
                            contractAddress: assestAddress,
                            functionName: "mintNft",
                            params: {
                                tokenUri: "ashim",
                                citizenshipId: "7",
                            },
                        },
                        onError: (error) => console.log(error),
                        onSuccess: () => handleWithdrawSuccess,
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
        </div>
    )
}
