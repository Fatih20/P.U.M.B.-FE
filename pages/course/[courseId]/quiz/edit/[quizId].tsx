import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Emitter from "../../../../../utils/emiiter"
import SecondBaseLayout from "../../../../../layout/SecondBaseLayout"
import QuizTitleForm from "../../../../../components/Quiz/QuizTitle"
import { getQuizById, patchQuiz } from "../../../../api/quizAPI"
import { QuizPatch } from "../../../../../types/TypesForUs"
import AddQuestionButton from "../../../../../components/Quiz/AddQuestionButton"
import QuizEdit from "../../../../../components/Quiz/QuizEdit"

export default function LecturePage() {
    // Initiate Router
    const router = useRouter()
    const { quizId } = router.query

    // Initiate State
    const [title, setTitle] = useState("");
    
    
    useEffect(() => {
        // Fetching data
        if(quizId && title == "" ){
            try {
                getQuizById(quizId).then(data => {
                    console.log(data);
                    
                    setTitle(data.result.data.title)
                })    
            } catch (error) {
                console.log(error);
            }
        }
    })

     // Listening Quiz Title Edit
     Emitter.once('QUIZ_PATCH', (data: QuizPatch) => {
        try {
            if(typeof quizId !== 'undefined') {
                patchQuiz(quizId,data).then(resp => {
                    setTitle(data.title)
                })
            }

        } catch (error) {
            console.log(error);
        }

    });

    return (
        <>
            <SecondBaseLayout showBackButton={true}>
                <div className="space-y-3 w-full">
                <QuizTitleForm text={title} editable={true}/>
                <QuizEdit/>
                <AddQuestionButton/>
                </div>
            </SecondBaseLayout>
        </>
    )
}


