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
const YoutubeEmbed = ({ url }: { url: string }) => {
    const embedId = youtube_parser(url)
    return (
        <>
            <iframe className="w-full"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </>
    )
}

YoutubeEmbed.propTypes = {
    url: PropTypes.string.isRequired
};

export default YoutubeEmbed;