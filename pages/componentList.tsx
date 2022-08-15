import YoutubeEmbed from "../components/Lecture/youtubeEmbed"
import ImageLecture from "../components/Lecture/imageLecture"
import FileDownloadButton from "../components/Lecture/fileDownloadButton"
import AddDropDownButton from "../components/Lecture/addDropDownButton"

export default function ComponentList() {


    return (
        <div className="container mx-auto w-70">
            <div className="min-h-full flex items-center justify-center bg-blue-300 py-12 px-6 md:px-48">
                <div className="w-full space-y-3">

                    <div className="rounded overflow-hidden shadow-lg p-3 bg-white">
                        <YoutubeEmbed embedId="EWfHJI3M0Fs" />
                    </div>
                    <div className="rounded overflow-hidden shadow-lg p-3 bg-white">
                        <ImageLecture imgUrl="https://www.looper.com/img/gallery/the-untold-truth-of-detective-conan/l-intro-1655141676.jpg" />
                    </div>
                    
                    <FileDownloadButton url="https://www.adobe.com/be_en/active-use/pdf/Alice_in_Wonderland.pdf" />
                    
                    <AddDropDownButton />


                </div>
            </div>

        </div>
    )
}
