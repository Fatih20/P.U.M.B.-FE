
import BaseLayout from "../../layout/BaseLayout"
import SecondBaseLayout from "../../layout/SecondBaseLayout"
import YoutubeEmbed from "../../components/Lecture/youtubeEmbed"

export default function LecturePage() {
    return (
        <>
            <SecondBaseLayout showBackButton={true}>
                {/* <h1>Halo, saya uzumaki naruto</h1> */}
                <YoutubeEmbed embedId="EWfHJI3M0Fs" />

            </SecondBaseLayout>
        </>
    )
}

