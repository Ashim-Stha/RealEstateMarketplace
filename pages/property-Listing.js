import React from 'react';

const Property = () => {
    return (
        <div className="flex flex-col items-center">
            
             {/* Horizontal Listing with 4 Cards in One Row */}
            <div className="grid grid-cols-3 gap-4 justify-items-center">
                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Cozy Cottage" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Cozy Cottage</h2>
                        <p>A charming cottage in the hills of Nepal.</p>
                        <p className="font-bold">Price: NPR 3,000,000</p>
                        <p>Location: Nagarkot</p>
                        <p>Owner: Ram Thapa</p>
                        <p>Contact: (981) 123-4567</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Luxury Villa" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Luxury Villa</h2>
                        <p>This villa offers luxury living with stunning views of the Himalayas.</p>
                        <p className="font-bold">Price: NPR 12,000,000</p>
                        <p>Location: Pokhara</p>
                        <p>Owner: Sita Sharma</p>
                        <p>Contact: (982) 654-3210</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Stylish Loft" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Stylish Loft</h2>
                        <p>A modern loft in the heart of Kathmandu.</p>
                        <p className="font-bold">Price: NPR 4,500,000</p>
                        <p>Location: Thamel, Kathmandu</p>
                        <p>Owner: Anil Joshi</p>
                        <p>Contact: (983) 123-4567</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Charming Bungalow" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Charming Bungalow</h2>
                        <p>A cozy bungalow perfect for a small family.</p>
                        <p className="font-bold">Price: NPR 2,500,000</p>
                        <p>Location: Bhaktapur</p>
                        <p>Owner: Priya Rai</p>
                        <p>Contact: (984) 567-8901</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Modern Apartment" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Modern Apartment</h2>
                        <p>A sleek apartment in the city center.</p>
                        <p className="font-bold">Price: NPR 5,000,000</p>
                        <p>Location: Lalitpur</p>
                        <p>Owner: Ramesh Koirala</p>
                        <p>Contact: (985) 678-9012</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Beach House" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Beach House</h2>
                        <p>A beautiful house with ocean views.</p>
                        <p className="font-bold">Price: NPR 10,000,000</p>
                        <p>Location: Biratnagar</p>
                        <p>Owner: Sunita Gurung</p>
                        <p>Contact: (981) 234-5678</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Mountain Cabin" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Mountain Cabin</h2>
                        <p>A rustic cabin perfect for a getaway.</p>
                        <p className="font-bold">Price: NPR 3,500,000</p>
                        <p>Location: Dhulikhel</p>
                        <p>Owner: Deepak Thapa</p>
                        <p>Contact: (982) 345-6789</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Urban Studio" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Urban Studio</h2>
                        <p>A compact studio in the city center.</p>
                        <p className="font-bold">Price: NPR 3,000,000</p>
                        <p>Location: Kathmandu</p>
                        <p>Owner: Nisha Sharma</p>
                        <p>Contact: (981) 456-7890</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Country House" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Country House</h2>
                        <p>A spacious house surrounded by nature.</p>
                        <p className="font-bold">Price: NPR 4,500,000</p>
                        <p>Location: Chitwan</p>
                        <p>Owner: Gopal Adhikari</p>
                        <p>Contact: (982) 567-8901</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4 transition-transform transform hover:scale-105">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Penthouse Suite" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Penthouse Suite</h2>
                        <p>A luxurious penthouse with panoramic views.</p>
                        <p className="font-bold">Price: NPR 25,000,000</p>
                        <p>Location: Kathmandu</p>
                        <p>Owner: Aditi Koirala</p>
                        <p>Contact: (981) 789-0123</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Property;
