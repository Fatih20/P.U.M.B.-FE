import React from "react";
import PropTypes from "prop-types";

// use youtube_parser when storing embedId to db later
function youtube_parser(url: string): any {
    let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
        // console.log("video id = ", videoid[1]);
        return videoid[1]
    } else {
        // console.log("The youtube url is not valid.");
    }
}
// possibly it's best to store embedId in the db, not the url
const YoutubeEmbed = ({ url }: { url: string }) => {
    const embedId = youtube_parser(url)
    return (
        <div className="relative">

            <div className="rounded overflow-hidden shadow-lg p-3 bg-white">
                <iframe className="w-full h-44 sm:h-80"
                    src={"https://www.youtube.com/embed/" + embedId}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />

                <button type="button" style={{ top: '1px', right: '-5px', height: 40 }}
                    className="shadow-lg absolute w-fit flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>

                </button>

            </div>
        </div>
    )
}

YoutubeEmbed.propTypes = {
    url: PropTypes.string.isRequired
};

export default YoutubeEmbed;