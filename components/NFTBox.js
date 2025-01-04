import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import realEstateMarketplaceAbi from "../constants/RealEstateMarketplace.json"
import assestAbi from "../constants/Assest.json"
import Image from "next/image"
import { Card, useNotification } from "web3uikit"
import { ethers } from "ethers"
import UpdateListingModal from "./UpdateListingModal"

const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."
    const seperatorLength = separator.length
    const charsToShow = strLen - seperatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return (
        fullStr.substring(0, frontChars) +
        separator +
        fullStr.substring(fullStr.length - backChars)
    )
}

export default function NFTBox({
    price,
    assestAddress,
    tokenId,
    realEstateMarketplaceAddress,
    seller,
}) {
    const { isWeb3Enabled, account } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)
    const dispatch = useNotification()

    let realEstateMarketplaceAddress1 = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

    let assestAddress1 = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: assestAbi,
        contractAddress: assestAddress1,
        functionName: "getTokenUri",
        params: {
            tokenId: "2",
        },
    })

    // const { runContractFunction: mintNft } = useWeb3Contract({
    //     abi: assestAbi,
    //     contractAddress: nftAddress,
    //     functionName: "mintNft",
    //     params: {
    //         tokenUri: "ashim",
    //         citizenshipId: 7,
    //     },
    // })

    const { runContractFunction: buyAssest } = useWeb3Contract({
        abi: realEstateMarketplaceAbi,
        contractAddress: realEstateMarketplaceAddress,
        functionName: "buyAssest",
        msgValue: price,
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        try {
            console.log("Fetching token URI...")
            const tokenURI = await getTokenURI()
            console.log(`The TokenURI is ${tokenURI}`)

            if (tokenURI) {
                const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                const tokenURIResponse = await fetch(requestURL).then((res) => res.json())

                if (tokenURIResponse) {
                    const imageURI = tokenURIResponse.image
                    const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                    setImageURI(imageURIURL)
                    setTokenName(tokenURIResponse.name)
                    setTokenDescription(tokenURIResponse.description)
                } else {
                    console.error("Failed to fetch tokenURIResponse")
                }
            }
        } catch (error) {
            console.error("Error in updateUI:", error)
        }
    }

    useEffect(() => {
        console.log("useEffect triggered")
        if (isWeb3Enabled) {
            updateUI()
        } else {
            console.log("Web3 is not enabled")
        }
    }, [isWeb3Enabled])
    // Dependency array to avoid infinite loop

    const isOwnedByUser = seller === account || seller === undefined
    const formattedSellerAddress = isOwnedByUser ? "you" : truncateStr(seller || "", 15)

    const handleCardClick = () => {
        isOwnedByUser
            ? setShowModal(true)
            : buyItem({
                  onError: (error) => console.log(error),
                  onSuccess: () => handleBuyItemSuccess(),
              })
    }

    const handleMintClick = () => {
        isOwnedByUser
            ? setShowModal(true)
            : mintNft({
                  onError: (error) => console.log(error),
                  onSuccess: () => handleBuyItemSuccess(),
              })
    }

    const handleBuyItemSuccess = () => {
        dispatch({
            type: "success",
            message: "Item bought!",
            title: "Item Bought",
            position: "topR",
        })
    }

    return (
        <div>
            <div>
                {imageURI ? (
                    <div>
                        <UpdateListingModal
                            isVisible={showModal}
                            tokenId={tokenId}
                            realEstateMarketplaceAddress={realEstateMarketplaceAddress}
                            onClose={hideModal}
                        />
                        <Card
                            title={tokenName}
                            description={tokenDescription}
                            onClick={handleCardClick}
                        >
                            <div className="p-2">
                                <div className="flex flex-col items-end gap-2">
                                    <div>#{tokenId}</div>
                                    <div className="italic text-sm">
                                        Owned by {formattedSellerAddress}
                                    </div>
                                    <Image
                                        loader={() => imageURI}
                                        src={imageURI}
                                        height="200"
                                        width="200"
                                    />
                                    <div className="font-bold">
                                        {ethers.utils.formatUnits(price, "ether")} ETH
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}
