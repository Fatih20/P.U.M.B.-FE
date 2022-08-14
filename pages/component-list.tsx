import YoutubeEmbed from "../components/Lecture/YoutubeEmbed"
import { Document } from 'react-pdf'

export default function componentListPage() {
    return (
        <div className="min-h-full flex items-center justify-center py-12 sm:px-6 lg:px-8">
            <div className="space-y-3">
                <YoutubeEmbed embedId="EWfHJI3M0Fs" />
            </div>
        </div>
    )
}
