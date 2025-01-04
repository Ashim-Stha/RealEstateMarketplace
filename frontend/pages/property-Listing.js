import React from 'react';

const Property = () => {
    return (
        <div className="flex flex-col items-center">
            
             {/* Horizontal Listing with 4 Cards in One Row */}
            <div className="grid grid-cols-3 gap-4 justify-items-center">
                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Cozy Cottage" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Cozy Cottage</h2>
                        <p>A charming cottage in the countryside.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Luxury Villa" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Luxury Villa</h2>
                        <p>This villa offers luxury living with stunning views.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Stylish Loft" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Stylish Loft</h2>
                        <p>A modern loft with an open floor plan.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Charming Bungalow" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Charming Bungalow</h2>
                        <p>A cozy bungalow perfect for a small family.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Modern Apartment" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Modern Apartment</h2>
                        <p>A sleek apartment in the heart of the city.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Beach House" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Beach House</h2>
                        <p>A beautiful house with ocean views.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Mountain Cabin" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Mountain Cabin</h2>
                        <p>A rustic cabin perfect for a getaway.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Urban Studio" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Urban Studio</h2>
                        <p>A compact studio in the city center.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Country House" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Country House</h2>
                        <p>A spacious house surrounded by nature.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 w-80 shadow-xl m-4">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Penthouse Suite" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Penthouse Suite</h2>
                        <p>A luxurious penthouse with panoramic views.</p>
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
