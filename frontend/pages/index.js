import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import NFTBox from "../components/NFTBox"
import realEstateMarketplaceAbi from "../constants/RealEstateMarketplace.json"
import assestAbi from "../constants/Assest.json"

export default function Home() {
    const { isWeb3Enabled } = useMoralis()
    const [listedNfts, setListedNfts] = useState([])
    const [loading, setLoading] = useState(true)
    const realEstateMarketplaceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const assestAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    const { runContractFunction: getAllListedItems } = useWeb3Contract({
        abi: realEstateMarketplaceAbi,
        contractAddress: realEstateMarketplaceAddress,
        functionName: "getAllListedItems",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            setLoading(true)
            fetchListedItems()
                .then((items) => {
                    setListedNfts(items)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error("Failed to fetch listed NFTs:", error)
                    setLoading(false)
                })
        }
    }, [isWeb3Enabled])

    async function fetchListedItems() {
        try {
            const items = await getAllListedItems()
            console.log("Fetched Listed Items:", items)

            // Check the data format
            if (!Array.isArray(items)) {
                throw new Error("Expected an array of listings but got something else.")
            }

            return items.map((item) => ({
                price: item.price.toString(),
                seller: item.seller,
            }))
        } catch (error) {
            console.error("Error fetching listed items:", error)
            return []
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {loading ? (
                    <div>Loading...</div>
                ) : listedNfts.length > 0 ? (
                    listedNfts.map(({ price, seller }, index) => (
                        <NFTBox
                            key={index}
                            price={price}
                            seller={seller}
                            // Pass additional props as required
                        />
                    ))
                ) : (
                    <div>No items listed.</div>
                )}
            </div>
        </div>
    )
}
