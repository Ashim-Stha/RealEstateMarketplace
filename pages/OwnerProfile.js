import Image from "next/image";
import assest from "../Assest"; // Adjust the path as necessary

const OwnerProfile = () => {
    return (
        <div className="w-full relative bg-white flex flex-col items-start justify-start text-left text-lg text-gray font-public-sans">
            <div className="self-stretch bg-whitesmoke overflow-hidden flex flex-col items-start justify-start min-h-[800px]">
                <div className="self-stretch flex flex-col items-start justify-start">
                    <div className="self-stretch border-gainsboro border-b-[1px] border-solid flex flex-row items-center justify-between py-3 px-10">
                        <div className="flex flex-row items-center justify-start gap-4">
                            <div className="flex flex-col items-start justify-start">
                                <div className="w-4 flex-1 relative overflow-hidden">
                                    <Image className="absolute top-[0px] left-[0px] w-4 h-4" width={16} height={16} alt="" src={assest.vector0} />
                                    <div className="absolute top-[0px] left-[0px] w-[13px] h-[13px]" />
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <b className="self-stretch relative leading-[23px]">Property Listing</b>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-row items-start justify-end gap-8 text-sm">
                            <div className="h-10 flex flex-row items-center justify-start gap-9">
                                <div className="flex flex-col items-start justify-start">
                                    <div className="self-stretch relative leading-[21px] font-medium">Explore</div>
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    <div className="self-stretch relative leading-[21px] font-medium">List Property</div>
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    <div className="self-stretch relative leading-[21px] font-medium">Manage Listings</div>
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    <div className="self-stretch relative leading-[21px] font-medium">Saved Properties</div>
                                </div>
                            </div>
                            <div className="flex flex-row items-start justify-start gap-2">
                                <div className="rounded-xl bg-aliceblue h-10 overflow-hidden flex flex-row items-center justify-center py-0 px-2.5 box-border max-w-[480px]">
                                    <div className="flex-1 flex flex-col items-center justify-start">
                                        <div className="self-stretch flex-1 relative overflow-hidden">
                                            <Image className="absolute top-[0px] left-[0px] w-5 h-5" width={20} height={20} alt="" src={Assest.vector0} />
                                            <div className="absolute top-[0px] left-[0px] w-[15px] h-4" />
                                        </div>
                                    </div>
                                </div>
                                {/* Additional buttons and images can be added here */}
                                <Image className="w-10 relative rounded-[20px] h-10 overflow-hidden shrink-0 object-cover" width={40} height={40} alt="" src={Assest.depth4Frame2} />
                            </div>
                        </div>
                    </div>
                    {/* The rest of the component code goes here */}
                </div>
            </div>
        </div>
    );
};

export default OwnerProfile; 