import YoutubeEmbed from "../../components/Lecture/YoutubeEmbed"
import FileDownloadButton from "../../components/Lecture/FileDownloadButton"
import ImageLecture from "../../components/Lecture/ImageLecture"

type Item = {
    id:any,
    type: string,
    name: string,
    url: string
}

export default function LectureItemFactory({ Items }: { Items: any }) {

    return (
        <>
            {Items.map((item: Item) => {
                // Video
                if (item.type == "VIDEO") {
                    return (
                        <YoutubeEmbed id={item.id} url={item.url} />
                    )
                }
                else if (item.type == "DOCUMENT") {
                    return (
                        <FileDownloadButton name={item.name} url={item.url} />
                    )
                }
                else if (item.type == "IMAGE") {
                    return (
                        <div className="rounded overflow-hidden shadow-lg p-3 bg-white">
                            <ImageLecture name={item.name} imgUrl={item.url} />
                        </div>
                    )
                }
            })}
        </>
    )
}
