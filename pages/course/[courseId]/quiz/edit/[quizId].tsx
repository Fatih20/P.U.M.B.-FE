import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import Emitter from "../../../../../utils/emiiter"
import SecondBaseLayout from "../../../../../layout/SecondBaseLayout"
import QuizTitleForm from "../../../../../components/Quiz/QuizTitle"
import { getQuizById, patchQuiz, postQuestionStatement, deleteQuestion } from "../../../../api/quizAPI"
import { QuizPatch, QuestionStatement, QuestionType } from "../../../../../types/typesForUs"
import AddQuestionButton from "../../../../../components/Quiz/AddQuestionButton"
import QuestionFactory from "../../../../../components/Quiz/QuestionFactory"


export default function QuizPage() {
    // Initiate Router
    const router = useRouter()
    const { quizId } = router.query

    // Initiate State
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([] as QuestionType[]);


    // Fetching data
    useEffect(() => {
        if (quizId && title == "") {
            try {
                // Get Quiz Title
                getQuizById(quizId).then(data => {
                    console.log(data);

                    setTitle(data.result.data.title)
                    setQuestions(data.result.data.questions)

                })


            } catch (error) {
                console.log(error);
            }
        }

        // Listening on Question Delete
        Emitter.on('QUESTION_DELETE', (id: any) => {

            deleteQuestion(id).then(resp => {
                console.log(resp);
                let itemsCopy = questions
                let result = itemsCopy.filter((item: any) => {
                    if (item.id != id) {
                        return item
                    }
                })
                setQuestions(result)
            })

        });



    })



    // Listening on Question Create New
    Emitter.on('QUESTION_POST', (data: any) => {
        handleQuestionPost()
    });


    async function handleQuestionPost() {
        if (typeof quizId !== 'undefined') {
            console.log("running post request");

            const payload: QuestionStatement = {
                statement: "Question Statement",
                quiz_id: quizId as string
            }

            postQuestionStatement(payload).then(resp => {

                console.log("post response");
                console.log(resp);

                let itemsCopy = questions
                itemsCopy.push(resp.result.data)
                setQuestions(itemsCopy)
            })
        }
    }


    // Listening Quiz Title Edit
    Emitter.once('QUIZ_PATCH', (data: QuizPatch) => {
        try {
            if (typeof quizId !== 'undefined') {
                patchQuiz(quizId, data).then(resp => {
                    setTitle(resp.result.data.title)
                })
            }

        } catch (error) {
            console.log(error);
        }

    });

    // Listening on Question Edit
    Emitter.on('QUESTION_PATCH', (data: QuestionStatement) => {
        console.log(data);


    });



    console.log(questions);



    return (
        <>
            <SecondBaseLayout showBackButton={true}>
                <div className="space-y-3 w-full">
                    <QuizTitleForm text={title} editable={true} />
                    {/* <QuizEdit /> */}


                    {questions.length >= 1 && <QuestionFactory Items={questions} />}


                    <AddQuestionButton />

                </div>
            </SecondBaseLayout>
        </>
    )
}


