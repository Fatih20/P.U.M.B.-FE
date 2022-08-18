import { useState, useEffect, useCallback } from "react"
import debounce from 'lodash.debounce';
import { useRouter } from "next/router"
import Emitter from "../../../../../utils/emiiter"
import SecondBaseLayout from "../../../../../layout/SecondBaseLayout"
import QuizTitleForm from "../../../../../components/Quiz/QuizTitle"
import { getQuizById, patchQuiz, postQuestionStatement, deleteQuestion } from "../../../../api/quizAPI"
import { QuizPatch, QuestionStatement, QuestionType } from "../../../../../types/typesForUs"
import AddQuestionButton from "../../../../../components/Quiz/AddQuestionButton"
import QuizEdit from "../../../../../components/Quiz/QuizEdit"
import QuestionFactory from "../../../../../components/Quiz/QuestionFactory"


export default function QuizPage() {
    // Initiate Router
    const router = useRouter()
    const { quizId } = router.query

    // Initiate State
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([] as QuestionType[]);
    const [isRequesting, setIsRequesting] = useState(false);
    const [number, setNumber] = useState(0);

    // let isRequesting = false

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
            Emitter.off('QUESTION_DELETE', "")
            try {
                console.log("ini fungsi di main");

                console.log(id);

                if (!isRequesting) {
                    setIsRequesting(true)
                    deleteQuestion(id).then(resp => {
                        console.log(resp);
                        setIsRequesting(false)
                    })
                }


            } catch (error) {
                console.log(error);
            }

        });

        // Listening on Question Create New
        Emitter.on('QUESTION_POST', (data: any) => {
            debouncedQuestionPost()
        });
    })

    function handleQuestionPost() {
        try {

            if (typeof quizId !== 'undefined') {
                console.log("running post request");

                const payload: QuestionStatement = {
                    statement: "Question Statement",
                    quiz_id: quizId as string
                }

                postQuestionStatement(payload).then(resp => {
                    // Butuh update question state, tapi harus fetching data dulu
                    // ada masalah di requestnya ke kirim berkali"
                    console.log("post response");
                    console.log(resp);
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    const debouncedQuestionPost = useCallback(
        debounce(handleQuestionPost, 300)
        , []);

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



    console.log("re-rendered");



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


