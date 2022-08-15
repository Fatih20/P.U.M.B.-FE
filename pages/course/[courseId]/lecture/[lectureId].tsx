import SecondBaseLayout from "../../../../layout/SecondBaseLayout"
import YoutubeEmbed from "../../../../components/Lecture/youtubeEmbed"
import LectureTitle from "../../../../components/Lecture/lectureTitle"
import { getLectures, postLectureTitle } from "../../../api/lectureAPI"

export default function LecturePage() {
    // getLectures()
    
    return (
        <>
            <SecondBaseLayout showBackButton={true}>
                {/* <h1>Halo, saya uzumaki naruto</h1> */}
                <div className="space-y-3 w-full ">
                    <LectureTitle />
                    {/* <YoutubeEmbed embedId="EWfHJI3M0Fs" /> */}

                </div>

            </SecondBaseLayout>
        </>
    )
}

