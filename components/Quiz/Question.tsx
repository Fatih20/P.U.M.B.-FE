
import { useMutation, QueryClient } from "react-query";
import { postQuestionStatement } from "@/utils/api/quiz";
import { QuestionStatement } from "@/appTypes/typesForUs";
import Emitter from "@/utils/emiiter";
import { useEffect } from "react";
import { useState } from "react";
import useMe from "@/hooks/useMe";
export default function Question({ question, attempt }: { question: any, attempt: boolean }) {

    // console.log("Data di dalem quesiton");
    // console.log(question);

    const queryClient = new QueryClient();
    const [greenCss, setGreenCss] = useState("");
    const { user, isLoading: userLoading } = useMe();


    useEffect(() => {
        if (attempt) {
            setGreenCss("bg-green-300")
        }
    })

    function handleAnswer(e: any) {
        const data = {
            question_id: question.id,
            option_id: e.target.value
        }

        Emitter.emit("OnChangeOption", data)
    }
    return (
        <>

            <div>
                <span>{question.statement}</span>
                <div className="space-y-3">
                    {question.options.map((item: any) => {
                        // Teacher
                        if (user?.role === "TEACHER") {
                            return (
                                <a href="#" key={item.id} className="block p-2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <label className="ml-2 text-sm  text-gray-900 dark:text-gray-300">{item.content}</label>
                                </a>
                            )
                        }

                        // Student
                        if (user?.role === "STUDENT") {
                            // console.log("STUDENT");

                            if (attempt) {
                                // console.log("ATTEMPT");

                                if (question.answer.correct_id == item.id) {
                                    // console.log("CORRECT ANS");

                                    return (
                                        <a href="#" key={item.id} className={`${greenCss} block p-2  rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                                            {!attempt &&
                                                <input
                                                    value={item.id}
                                                    onChange={(e) => handleAnswer(e)}
                                                    name={question.id}
                                                    type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                            }
                                            <label className="ml-2 text-sm  text-gray-900 dark:text-gray-300">{item.content}</label>
                                            <hr />
                                            <span className="mx-2 text-sm">{question.answer.feedback}</span>
                                        </a>
                                    )
                                } else if (question.answer.option_id == item.id) {
                                    // console.log("WRONG ANS");
                                    
                                    return (

                                        <a href="#" key={item.id} className="block p-2 bg-red-300 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                            {!attempt &&
                                                <input
                                                    value={item.id}
                                                    onChange={(e) => handleAnswer(e)}
                                                    name={question.id}
                                                    type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                            }

                                            <label className="ml-2 text-sm  text-gray-900 dark:text-gray-300">{item.content}</label>
                                        </a>
                                    )
                                }else {
                                    // console.log("Other ANS");
                                    return (
                                        <a href="#" key={item.id} className="block p-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                            {!attempt &&
                                                <input
                                                    value={item.id}
                                                    onChange={(e) => handleAnswer(e)}
                                                    name={question.id}
                                                    type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                            }
    
                                            <label className="ml-2 text-sm  text-gray-900 dark:text-gray-300">{item.content}</label>
                                        </a>
                                    )
                                }
                            } else {
                                return (
                                    <a href="#" key={item.id} className="block p-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        {!attempt &&
                                            <input
                                                value={item.id}
                                                onChange={(e) => handleAnswer(e)}
                                                name={question.id}
                                                type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                        }

                                        <label className="ml-2 text-sm  text-gray-900 dark:text-gray-300">{item.content}</label>
                                    </a>
                                )
                            }
                        }
                    })}
                </div>
            </div>

        </>
    )
}

