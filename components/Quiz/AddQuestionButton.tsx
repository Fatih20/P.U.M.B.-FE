
import { useMutation, QueryClient } from "react-query";
import { postQuestionStatement } from "@/utils/api/quiz";
import { QuestionStatement } from "@/appTypes/typesForUs";
import Emitter from "@/utils/emiiter";

export default function AddDropDownButton({quizId}:{quizId:string}) {
    const queryClient = new QueryClient();

    const { mutate, isLoading } = useMutation(postQuestionStatement, {
        onSuccess: data => {
            console.log(data);
        },
        onError: () => {
            alert("there was an error")
        },
        onSettled: () => {
            queryClient.invalidateQueries("Quiz")
            Emitter.emit("QUESTION_POST", "");
        }
    });

    function handleSubmit() {

        const payload: QuestionStatement = {
            statement: "Question Statement",
            quiz_id: quizId as string
        }
        mutate(payload)
    }

    return (
        <>

            <button onClick={() => handleSubmit()}
                className="w-full sm:w-auto shadow-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                <span className="text-left">
                    + Add Question..
                </span>
                {/* <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg> */}
            </button>

        </>
    )
}

