import YoutubeEmbed from "../../components/Lecture/YoutubeEmbed"


type Item = {
    type : string,
    name : string,
    url : string
}

export default function LectureItemFactory({ Items }: { Items: any }) {

    return (
        <>
            {Items.map((item: Item) => {
                // Video
                if (item.type == "VIDEO") {
                    return (
                        <YoutubeEmbed url={item.url} />
                    )
                }
            })}
        </>
    )
}
