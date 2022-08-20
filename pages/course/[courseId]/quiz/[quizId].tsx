import BaseLayout from "@/layout/BaseLayout"
import useMe from "@/hooks/useMe";
import { getQuizById } from "@/utils/api/quiz";
import { useRouter } from "next/router";
import { useQuery, QueryClient, useMutation } from "react-query";
import Question from "@/components/Quiz/Question";
import { useEffect, useState } from "react";
import Emitter from "@/utils/emiiter";
import { postQuestionAnswer, getQuizSubmission } from "@/utils/api/quiz";

export default function QuizPage() {
    const { user, isLoading: userLoading } = useMe();

    // Initiate Router
    const router = useRouter()
    const { quizId } = router.query

    // React Query
    const queryClient = new QueryClient();
    const { data, status, error, refetch } = useQuery(["Quiz", quizId as string], getQuizById);
    const { data: quizAnswer, status: quizAnswerStat } = useQuery(["QuizAnswered", quizId as string], getQuizSubmission);


    console.log(data);


    const [answer, setAnswer] = useState([] as any[]);
    const [result, setResult] = useState([] as any[]);

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

    // Appending Answer State
    Emitter.on("OnChangeOption", (data: any) => {
        let answerCopy = answer
        let answered = false
        if (answerCopy.some((e: any) => e.question_id === data.question_id)) {
            answered = true
            let updatedResult = answerCopy.map((item: any) => {
                if (item.question_id === data.question_id) {
                    return data
                } else {
                    return item
                }
            })
            setAnswer(updatedResult)
        }

        if (!answered) {
            answerCopy.push(data)
            setAnswer(answerCopy)
        }
    })

    // Submit Answer
    function handleSubmit() {
        let id = quizId
        let data = answer
        postAnswerMutate({ id, data })
    }

    // Jika sudah attempt
    // if (data?.data.attempt === true) {





    //     return (
    //         <h1>You attempt this Quiz</h1>
    //     )
    // }

    console.log("data");
    let questionList = data?.data.questions
    // console.log(questionList[0]);

    // console.log("quiz Answer");
    let answerList = quizAnswer?.result.data.answers
    // console.log(answerList[0]);



    useEffect(() => {
        if (questionList !== undefined && answerList !== undefined) {
            questionList = data?.data.questions
            answerList = quizAnswer?.result.data.answers
            questionList.forEach(function (item: any, i: any) {
                // console.log('%d: %s', i, item);
                item['answer'] = answerList[i]
            });
            console.log(questionList);
            setResult(questionList)
        }
    })



    return (
        <BaseLayout showBackButton={true}>
            <div className="mt-3 space-y-3 w-full">
                <div>
                    {/* <h1 className="text-lg">Title of Course</h1> */}
                    <h1 className="text-3xl">{data?.data.title}</h1>
                    <h1>Score : {quizAnswer?.result.data.score}</h1>
                    
                </div>
                <div className="mt-3 space-y-6 w-full">
                    {status === "success" && data?.data.attempt === false && data?.data.questions.map((item: any) => {
                        return (
                            <Question key={item.id} question={item} attempt={data?.data.attempt} />
                        )
                    })}

                    {status === "success" && data?.data.attempt === true && result.map((item: any) => {
                        return (
                            <Question key={item.id} question={item} attempt={data?.data.attempt} />
                        )
                    })}
                </div>

                {
                    !data?.data.attempt &&
                    <button
                        onClick={() => handleSubmit()}
                        className="w-full justify-center sm:w-auto shadow-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Submit
                    </button>
                }


            </div>
        </BaseLayout>
    )
}
