import SingleForm from "./SingleForm"
import Statement from "./Statement"
import { useState } from "react";
import Emitter from "../../utils/emiiter";
import { QuestionStatement } from "../../types/TypesForUs";

export default function QuizEdit() {
    const [question, setQuestion] = useState({edit:false});

    Emitter.once('QUESTION_STATEMENT_CLICK', () => {
        try {
            setQuestion({...question, edit:true})
        } catch (error) {
            console.log(error);
        }

    });

    Emitter.once('QUESTION_SUBMIT', (data:QuestionStatement) => {
        try {
            setQuestion({...question, edit:false})
            // console.log(data);
            
        } catch (error) {
            console.log(error);
        }

    });

    return (
        <>
            <div className="rounded overflow-hidden  shadow-lg p-3">
                <div className="space-y-3">

                    {/* Question */}
                    {!question.edit && <Statement text="This is Question Statement"/>}

                    {question.edit && <SingleForm placeholder="question.." event="QUESTION_SUBMIT" />}
                    

                    <div className="ml-5 space-y-3 ">

                        {/* Answer Radio */}
                        <form >
                            <div className="flex items-center mb-4">
                                <input id="default-radio-1" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="default-radio-1" className="ml-2 text-sm  text-gray-900 dark:text-gray-300">Default radio</label>
                            </div>
                            <div className="flex items-center">
                                <input defaultChecked id="default-radio-2" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="default-radio-2" className="ml-2 text-sm  text-gray-900 dark:text-gray-300">Checked state</label>
                            </div>
                        </form>

                        {/* Add Answer Button */}
                        <button className="text-sm ">
                            {/* <a href="#" className=""></a> */}
                            + Add Answer
                        </button>
                    </div>

                    {/* Feedback */}
                    {/* <SingleForm placeholder="feedback.." /> */}
                    <hr />
                    <Statement text="This is Feedback Statement"/>


                </div>
            </div>

        </>
    )
}
