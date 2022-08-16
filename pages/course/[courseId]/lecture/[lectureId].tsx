import { useState } from "react"
import { useRouter } from "next/router"
import SecondBaseLayout from "../../../../layout/SecondBaseLayout"
import LectureTitleForm from "../../../../components/Lecture/lectureTitle"
import AddDropDownButton from "../../../../components/Lecture/addDropDownButton"
import LectureItemFactory from "../../../../components/Lecture/lectureItemFactory"


export default function LecturePage() {
    // Initiate Router
    const router = useRouter()
    const { courseId } = router.query
    
    const [lectureItemFormTrigger, setLectureItemFormTrigger] = useState({ generate: false, type: "" })

    function handleLectureItemFormTrigger(formType: string) {
        setLectureItemFormTrigger({ ...lectureItemFormTrigger, generate: true, type: formType })
    }



    return (
        <>
            <SecondBaseLayout showBackButton={true}>
                <div className="space-y-3 w-full ">
                    <LectureTitleForm />

                    {lectureItemFormTrigger.generate && <LectureItemFactory/>}

                    <AddDropDownButton handleTrigger={handleLectureItemFormTrigger} />
                </div>

            </SecondBaseLayout>
        </>
    )
}


