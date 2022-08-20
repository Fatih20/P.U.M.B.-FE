
import { useMutation, QueryClient } from "react-query";
import { postQuestionStatement } from "@/utils/api/quiz";
import { QuestionStatement } from "@/appTypes/typesForUs";
import Emitter from "@/utils/emiiter";

export default function Question({ question }: { question: any }) {

    const queryClient = new QueryClient();


    // console.log("Question");
    // console.log(question);

    function handleAnswer(e: any) {
        // console.log(question.id);
        // console.log(e.target.value);

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
                        return (

                            <a href="#" key={item.id} className="block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <input
                                    // onClick={() => handleCorrectOption(option.id)}
                                    // // {questionAnswer == option.id }
                                    // checked={questionAnswer?.result.data?.correct_id == option.id}
                                    // readOnly
                                    value={item.id}
                                    onChange={(e) => handleAnswer(e)}
                                    name={question.id}
                                    type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                <label className="ml-2 text-sm  text-gray-900 dark:text-gray-300">{item.content}</label>

                            </a>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

