export default function FileDownloadButton({ url,name }: { url: string, name: string }) {
    return (
        <>

            {/* PDF Download Button Start */}
            <div className="flex p-3 rounded-lg shadow-lg bg-white w-full">
                <div className="w-10/12 flex items-center ">
                    <div className="flex items-center  space-x-1 w-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={2}>
                                <path strokeLinecap="round" d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.342a2 2 0 0 0-.602-1.43l-4.44-4.342A2 2 0 0 0 13.56 2H6a2 2 0 0 0-2 2Zm5 9h6m-6 4h3" />
                                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                            </g>
                        </svg>
                        <span>{name}</span>
                    </div>
                </div>
                <a  target="_blank" href={url} className="w-2/12">
                    <button className="w-full flex items-center justify-center  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <div className="flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                <g fill="currentColor">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                </g>
                            </svg>
                            <span className="hidden lg:block"> Download</span>
                        </div>
                    </button>
                </a>
            </div>
            {/*s PDF Download Button End */}

        </>
    )
}

