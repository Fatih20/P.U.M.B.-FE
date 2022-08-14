import YoutubeEmbed from "../components/Lecture/YoutubeEmbed"
import ImageLecture from "../components/Lecture/ImageLecture"

export default function componentListPage() {
    

    return (
        <div className="min-h-full flex items-center justify-center bg-blue-300 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-3">
                <YoutubeEmbed embedId="EWfHJI3M0Fs" />
                
                {/* Butuh nama */}
                {/* <PdfButton /> */}

                <ImageLecture imgUrl="https://www.looper.com/img/gallery/the-untold-truth-of-detective-conan/l-intro-1655141676.jpg"/>            

            </div>
        </div>
    )
}
