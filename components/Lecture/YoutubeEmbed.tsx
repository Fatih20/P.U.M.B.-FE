import React from "react";
import PropTypes from "prop-types";

// use youtube_parser when storing embedId to db later
function youtube_parser(url: string): any {
    let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
        console.log("video id = ", videoid[1]);
        return videoid[1]
    } else {
        console.log("The youtube url is not valid.");
    }
}
// possibly it's best to store embedId in the db, not the url
const YoutubeEmbed = ({ embedId }: { embedId: string }) => {
    // const embedId = youtube_parser(youtubeUrl)
    return (
        <>

            <div className="max-w-sm rounded overflow-hidden shadow-lg p-3">
                <iframe
                    src={`https://www.youtube.com/embed/${embedId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>


        </>
    )
}

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;