import YoutubeEmbed from "../components/Lecture/YoutubeEmbed"
import ImageLecture from "../components/Lecture/ImageLecture"
import FileDownloadButton from "../components/Lecture/fileDownloadButton"

export default function componentListPage() {


    return (
        <div className="min-h-full flex items-center justify-center bg-blue-300 py-12 sm:px-6 lg:px-8">
            <div className="w-full space-y-3">

                <div className="max-w-sm rounded overflow-hidden shadow-lg p-3 bg-white">
                    <YoutubeEmbed embedId="EWfHJI3M0Fs" />
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg p-3 bg-white">
                    <ImageLecture imgUrl="https://www.looper.com/img/gallery/the-untold-truth-of-detective-conan/l-intro-1655141676.jpg" />
                </div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg p-3 bg-white">

                    <FileDownloadButton url="https://www.adobe.com/be_en/active-use/pdf/Alice_in_Wonderland.pdf" />

                </div>


            </div>
        </div>
    )
}
