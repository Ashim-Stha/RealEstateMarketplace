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
    const [tokenUri, setTokenUri] = useState("")
    const [citizenshipId, setCitizenshipId] = useState("")
    const [approveTokenId, setApproveTokenId] = useState("")
    const [listItemTokenId, setListItemTokenId] = useState("")
    const [listItemPrice, setListItemPrice] = useState("")
    const [buyItemTokenId, setBuyItemTokenId] = useState("")

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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0', padding: '0' }}>
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

                <Form
                    onSubmit={(data) => {
                        setTokenUri(data.data[0].inputResult)
                        setCitizenshipId(data.data[1].inputResult)
                    }}
                    data={[
                        {
                            name: "Token URI",
                            type: "text",
                            value: "",
                            key: "tokenUri",
                        },
                        {
                            name: "Citizenship ID",
                            type: "number",
                            value: "",
                            key: "citizenshipId",
                        },
                    ]}
                    title="Mint NFT"
                    id="Mint NFT Form"
                    style={{ margin: '5px 0' }}
                />

                <Button
                    onClick={() => {
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
                    text="Mint NFT"
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
                        runContractFunction({
                            params: {
                                abi: assestAbi,
                                contractAddress: assestAddress,
                                functionName: "getTokenUri",
                                params: {
                                    tokenId: "1",
                                },
                            },
                            onError: (error) => console.log(error),
                            onSuccess: (result) => handleGetTokenUri(result),
                        })
                    }}
                    text="getTokenUri"
                    type="button"
                />

                <Form
                    onSubmit={(data) => {
                        setApproveTokenId(data.data[0].inputResult)
                    }}
                    data={[
                        {
                            name: "Token ID to Approve",
                            type: "number",
                            value: "",
                            key: "approveTokenId",
                        },
                    ]}
                    title="Approve NFT"
                    id="Approve NFT Form"
                    style={{ margin: '5px 0' }}
                />

                <Button
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: assestAbi,
                                contractAddress: assestAddress,
                                functionName: "approve",
                                params: {
                                    to: realEstateMarketplaceAddress,
                                    tokenId: approveTokenId,
                                },
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess(),
                        })
                    }}
                    text="Approve"
                    type="button"
                    style={{ margin: '5px 0' }}
                />

                <Form
                    onSubmit={(data) => {
                        setListItemTokenId(data.data[0].inputResult)
                        setListItemPrice(data.data[1].inputResult)
                    }}
                    data={[
                        {
                            name: "Token ID to List",
                            type: "number",
                            value: "",
                            key: "listItemTokenId",
                        },
                        {
                            name: "Price (in ETH)",
                            type: "number",
                            value: "",
                            key: "listItemPrice",
                        },
                    ]}
                    title="List Item"
                    id="List Item Form"
                    style={{ margin: '5px 0' }}
                />

                <Button
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: realEstateMarketplaceAbi,
                                contractAddress: realEstateMarketplaceAddress,
                                functionName: "listItem",
                                params: {
                                    tokenId: listItemTokenId,
                                    price: ethers.utils.parseUnits(listItemPrice, "ether").toString(),
                                },
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess(),
                        })
                    }}
                    text="List Item"
                    type="button"
                    style={{ margin: '5px 0' }}
                />

                <Form
                    onSubmit={(data) => {
                        setBuyItemTokenId(data.data[0].inputResult)
                    }}
                    data={[
                        {
                            name: "Token ID to Buy",
                            type: "number",
                            value: "",
                            key: "buyItemTokenId",
                        },
                    ]}
                    title="Buy Item"
                    id="Buy Item Form"
                    style={{ margin: '5px 0' }}
                />

                <Button
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: realEstateMarketplaceAbi,
                                contractAddress: realEstateMarketplaceAddress,
                                functionName: "buyItem",
                                msgValue: ethers.utils.parseUnits("1", "ether"),
                                params: {
                                    tokenId: buyItemTokenId,
                                },
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess(),
                        })
                    }}
                    text="Buy Item"
                    type="button"
                    style={{ margin: '5px 0' }}
                />

                <Button
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: realEstateMarketplaceAbi,
                                contractAddress: realEstateMarketplaceAddress,
                                functionName: "cancelListing",
                                params: {
                                    tokenId: "1",
                                },
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess(),
                        })
                    }}
                    text="cancelListing"
                    type="button"
                />

                <Button
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: realEstateMarketplaceAbi,
                                contractAddress: realEstateMarketplaceAddress,
                                functionName: "updateListing",
                                params: {
                                    tokenId: "1",
                                    newPrice: "2",
                                },
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess(),
                        })
                    }}
                    text="cancelListing"
                    type="button"
                />
            </div>
        </div>
    )
}
