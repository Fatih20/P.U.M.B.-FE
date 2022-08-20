import BaseLayout from "@/layout/BaseLayout"
import useMe from "@/hooks/useMe";
import { getQuizById } from "@/utils/api/quiz";
import { useRouter } from "next/router";
import { useQuery, QueryClient, useMutation } from "react-query";
import Question from "@/components/Quiz/Question";
import { useState } from "react";
import Emitter from "@/utils/emiiter";
import { postQuestionAnswer } from "@/utils/api/quiz";

export default function QuizPage() {
    const { user, isLoading: userLoading } = useMe();

    // Initiate Router
    const router = useRouter()
    const { quizId } = router.query

    // React Query
    const queryClient = new QueryClient();
    const { data, status, error, refetch } = useQuery(["Quiz", quizId as string], getQuizById);
    
    console.log(data);
    
    const [answer, setAnswer] = useState([] as any[]);

    // Mutate Answer POST
    const { mutate: postAnswerMutate } = useMutation(postQuestionAnswer, {
        onSuccess: data => {
            // Emitter.emit("OPTION_POST", data);
            console.log(data);
        },
        onError: () => {
            alert("there was an error")
        },
        onSettled: () => {
            queryClient.invalidateQueries('Quiz')
        }
    });

    Emitter.on("OnChangeOption", (data: any) => {
        let answerCopy = answer

        let answered = false
        // jika ada
        if (answerCopy.some((e: any) => e.question_id === data.question_id)) {
            answered = true
            // console.log("ada");
            let updatedResult = answerCopy.map((item: any) => {
                if (item.question_id === data.question_id) {
                    return data
                } else {
                    return item
                }
            })

            setAnswer(updatedResult)
            // console.log(answer);

        }

        // jika belum ada
        if (!answered) {
            // console.log("tidak ada");

            answerCopy.push(data)
            setAnswer(answerCopy)
            // console.log(answer);
        }
    })

    function handleSubmit() {
        let id = quizId
        let data = answer
        postAnswerMutate({id, data })
    }

    return (

        <BaseLayout showBackButton={true}>
            <div className="mt-3 space-y-3 w-full">
                <div>
                    <h1 className="text-lg">Title of Course</h1>
                    <h1 className="text-3xl">Title of Quiz</h1>
                </div>
                <div className="mt-3 space-y-6 w-full">
                    {status === "success" && data?.result.data.questions.map((item: any) => {
                        return (
                            <Question key={item.id} question={item} />
                        )
                    })}
                </div>

                <button
                    onClick={() => handleSubmit()}
                    className="w-full justify-center sm:w-auto shadow-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Submit
                    {/* <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg> */}
                </button>

            </div>
        </BaseLayout>

    )
}
