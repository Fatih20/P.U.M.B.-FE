import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Emitter from "../../../../../utils/emiiter"
import SecondBaseLayout from "../../../../../layout/SecondBaseLayout"
import LectureTitleForm from "../../../../../components/Lecture/lectureTitle"
import AddDropDownButton from "../../../../../components/Lecture/addDropDownButton"
import LectureItemFormFactory from "../../../../../components/Lecture/LectureItemFormFactory"
import LectureItemFactory from "../../../../../components/Lecture/LectureItemFactory"
import { getLectureItems } from "../../../../api/lectureAPI"

export default function LecturePage() {
    // Initiate Router
    const router = useRouter()
    const { courseId } = router.query

    // Initiate State
    const [lectureItemFormTrigger, setLectureItemFormTrigger] = useState({ show: false, type: "" })
    const [lectureItems, setLectureItems] = useState({ items: [] as object[], fetched: false })

    // Show Hide Lecture Item Form
    function handleLectureItemFormTrigger(formType: string) {
        setLectureItemFormTrigger({ ...lectureItemFormTrigger, show: true, type: formType })
    }
    
    useEffect(() => {
        // Fetching data
        if (courseId && lectureItems.fetched == false) {
            getLectureItems(courseId).then((data) => {
                let lectureItem = data.result.data
                setLectureItems({ ...lectureItems, items: lectureItem, fetched: true })
            })
        }
    })

    // Update LectureItems State
    function updateLectureItems(data: any) {
        let newItem = data.result.data
        let itemsCopy = lectureItems.items

        itemsCopy.push(newItem)

        setLectureItems({ ...lectureItems, items: itemsCopy, fetched: true })
        setLectureItemFormTrigger({ ...lectureItemFormTrigger, show: false, type: "" })
    }

    // Listening Lecture Item Delete
    Emitter.on('LECTURE_ITEM_DELETE', (data: any) => {
        
        let itemsCopy = lectureItems.items
        let result = itemsCopy.filter((item:any)=>{
            if (item.id != data.id){
                return item
            }
        })
        setLectureItems({ ...lectureItems, items: result, fetched: true })
    });

    return (
        <>
            <SecondBaseLayout showBackButton={true}>
                <div className="space-y-3 w-full ">
                    
                    <LectureTitleForm editable={true} />


                    {lectureItems.fetched && <LectureItemFactory Items={lectureItems.items} editable={true}/>}

                    <div className="rounded h-fit shadow-lg bg-white">
                        {lectureItemFormTrigger.show && <LectureItemFormFactory type={lectureItemFormTrigger.type} callback={updateLectureItems} />}
                    </div>

                    <AddDropDownButton handleTrigger={handleLectureItemFormTrigger} />
                </div>

            </SecondBaseLayout>
        </>
    )
}

