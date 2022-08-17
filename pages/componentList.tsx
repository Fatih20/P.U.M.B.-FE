import YoutubeEmbed from "../components/Lecture/YoutubeEmbed"
import ImageLecture from "../components/Lecture/ImageLecture"
import FileDownloadButton from "../components/Lecture/FileDownloadButton"
import AddDropDownButton from "../components/Lecture/addDropDownButton"

export default function ComponentList() {


    return (
        <div className="container mx-auto w-70">
            <div className="min-h-full flex items-center justify-center bg-blue-300 py-12 px-6 md:px-48">
                <div className="w-full space-y-3">

                    <YoutubeEmbed url="EWfHJI3M0Fs" />
                    <YoutubeEmbed url="EWfHJI3M0Fs" />
                    <div className="rounded overflow-hidden shadow-lg p-3 bg-white">
                        <ImageLecture name="test" imgUrl="https://www.looper.com/img/gallery/the-untold-truth-of-detective-conan/l-intro-1655141676.jpg" />
                    </div>

                    <FileDownloadButton name="test name" url="https://www.adobe.com/be_en/active-use/pdf/Alice_in_Wonderland.pdf" />

                    {/* <AddDropDownButton /> */}


                </div>
            </div>

        </div>
    )
}
