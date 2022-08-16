import { useState } from "react";

export default function AddDropDownButton({handleTrigger}:{handleTrigger:any}) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>

            <div className="relative" onClick={() => setShowDropdown(!showDropdown)}>
                <button className="w-full sm:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    <span className="w-11/12 text-left">
                        + Add Item.. 
                    </span>
                    <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {/* Dropdown menu */}
                {showDropdown && 
                    <div className="w-full sm:w-auto z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 block" style={{ position: 'absolute', inset: '-26px auto auto -292px', margin: 0, transform: 'translate(291px, 70px)' }}>
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                            <li>
                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Document
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Image
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleTrigger("youtube")} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Youtube Video Link
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                }
            </div>

        </>
    )
}

