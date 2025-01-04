import React, { useState } from "react"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid"

const OwnerDetailForm = () => {
    const [ownerName, setOwnerName] = useState("")
    const [identityNumber, setIdentityNumber] = useState("")
    const [identityPhoto, setIdentityPhoto] = useState(null)
    const [location, setLocation] = useState("")
    const [lalPurjaNumber, setLalPurjaNumber] = useState("")
    const [lalPurjaPhoto, setLalPurjaPhoto] = useState(null)
    const [area, setArea] = useState("")

    const isFormValid = () => {
        const nameValid = /^[A-Za-z].*/.test(ownerName) // Name must start with a letter
        const identityNumberValid = /^\d+$/.test(identityNumber) // Identity number must be all numbers
        const lalPurjaNumberValid = /^\d+$/.test(lalPurjaNumber) // Lal Purja number must be all numbers
        const areaValid = /^\d+$/.test(area) // Area must be a number

        return (
            nameValid &&
            identityNumberValid &&
            lalPurjaNumberValid &&
            areaValid &&
            // identityPhoto &&
            lalPurjaPhoto
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isFormValid()) {
            alert("Please fill out the form correctly before submitting.")
            return
        }

        // Prepare FormData object
        const formData = new FormData()
        formData.append("name", ownerName) // Add ownerName
        formData.append("description", location) // Add description
        formData.append("front", lalPurjaPhoto) // Add Lal Purja Photo
        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`)
            }

            const result = await response.json()
            alert("Upload successful!")
            console.log(result)
        } catch (error) {
            console.error("Error uploading data:", error)
            alert("An error occurred while uploading the data.")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-lg font-semibold text-gray-900">Owner Information</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            This information will be displayed publicly, so be careful what you
                            share.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="ownerName"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="ownerName"
                                        name="ownerName"
                                        type="text"
                                        value={ownerName}
                                        onChange={(e) => setOwnerName(e.target.value)}
                                        required
                                        className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="identityNumber"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Identity Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="identityNumber"
                                        name="identityNumber"
                                        type="number"
                                        value={identityNumber}
                                        onChange={(e) => setIdentityNumber(e.target.value)}
                                        required
                                        className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            {/* <div className="col-span-full">
                                <label
                                    htmlFor="identityPhoto"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Photo of Identity
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center flex flex-col items-center">
                                        <PhotoIcon
                                            aria-hidden="true"
                                            className="h-12 w-12 text-gray-300"
                                        />
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label
                                                htmlFor="identity-file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="identity-file-upload"
                                                    name="identity-file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) =>
                                                        setIdentityPhoto(e.target.files[0])
                                                    }
                                                    required
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div> */}

                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Location
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                        className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="lalPurjaNumber"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Lalpurja Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lalPurjaNumber"
                                        name="lalPurjaNumber"
                                        type="text"
                                        value={lalPurjaNumber}
                                        onChange={(e) => setLalPurjaNumber(e.target.value)}
                                        required
                                        className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="lalPurjaPhoto"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Lal Purja Photo
                                </label>
                                <div
                                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                                    onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        const file = e.dataTransfer.files[0] // Get the dropped file
                                        setLalPurjaPhoto(file)
                                    }}
                                >
                                    <div className="text-center flex flex-col items-center">
                                        <PhotoIcon
                                            aria-hidden="true"
                                            className="h-12 w-12 text-gray-300"
                                        />
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label
                                                htmlFor="lalPurja-file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="lalPurja-file-upload"
                                                    name="lalPurja-file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) =>
                                                        setLalPurjaPhoto(e.target.files[0])
                                                    }
                                                    required
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                        {lalPurjaPhoto && (
                                            <p className="text-sm text-green-600 mt-2">
                                                {`Selected: ${lalPurjaPhoto.name}`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="area"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Area (in sq m)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="area"
                                        name="area"
                                        type="number"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        required
                                        className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                                isFormValid()
                                    ? "bg-indigo-600 hover:bg-indigo-500"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default OwnerDetailForm
