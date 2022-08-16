import SecondBaseLayout from "../../../../layout/SecondBaseLayout"
import LectureTitleForm from "../../../../components/Lecture/lectureTitle"

export default function LecturePage() {        
    return (
        <>
            <SecondBaseLayout showBackButton={true}>
                {/* <h1>Halo, saya uzumaki naruto</h1> */}
                <div className="space-y-3 w-full ">
                    <LectureTitleForm  />
                    {/* <YoutubeEmbed embedId="EWfHJI3M0Fs" /> */}

                </div>

            </SecondBaseLayout>
        </>
    )
}


