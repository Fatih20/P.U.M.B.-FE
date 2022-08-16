import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import SecondBaseLayout from "../../../../layout/SecondBaseLayout"
import LectureTitleForm from "../../../../components/Lecture/lectureTitle"
import AddDropDownButton from "../../../../components/Lecture/addDropDownButton"
import LectureItemFormFactory from "../../../../components/Lecture/LectureItemFormFactory"
import LectureItemFactory from "../../../../components/Lecture/LectureItemFactory"
import { getLectureItems } from "../../../api/lectureAPI"

export default function LecturePage() {
    // Initiate Router
    const router = useRouter()
    const { courseId } = router.query
    
    // Initiate State
    const [lectureItemFormTrigger, setLectureItemFormTrigger] = useState({ generate: false, type: "" })
    const [lectureItems, setLectureItems] = useState({ items:{} , fetched:false})

    // Show Hide Lecture Item Form
    function handleLectureItemFormTrigger(formType: string) {
        setLectureItemFormTrigger({ ...lectureItemFormTrigger, generate: true, type: formType })
    }


    
      

    // Fetching data
    useEffect(() => {
        if (courseId && lectureItems.fetched == false) {
            getLectureItems(courseId).then((data) => {
                console.log(data.result.data);

                let lectureItem = data.result.data
                setLectureItems({...lectureItems, items:lectureItem, fetched:true})
                // lectureItem.forEach((element:object) => {
                //     console.log(element);
                // });

            })
        }
    })

    return (
        <>
            <SecondBaseLayout showBackButton={true}>
                <div className="space-y-3 w-full ">
                    <LectureTitleForm />

                    {lectureItemFormTrigger.generate && <LectureItemFormFactory/>}
                    {lectureItems.fetched && <LectureItemFactory Items={lectureItems.items} />}
                    <AddDropDownButton handleTrigger={handleLectureItemFormTrigger} />
                </div>

            </SecondBaseLayout>
        </>
    )
}


