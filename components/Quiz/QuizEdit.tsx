import SingleForm from "@/components/Quiz/SingleForm";
import Statement from "@/components/Quiz/Statement";
import { useState } from "react";
import Emitter from "@/utils/emiiter";
import { QuestionStatement } from "@/appTypes/typesForUs";
import { QuestionType } from "@/appTypes/typesForUs";
import { deleteQuestion } from "@/utils/api/quiz";

export default function QuizEdit({ item, questionId }: { item: QuestionType, questionId: string }) {
  const [question, setQuestion] = useState({ edit: false });

  Emitter.once('QUESTION_STATEMENT_CLICK', () => {
    // Show Question SingleForm
    setQuestion({ ...question, edit: true })
    try {
    } catch (error) {
      console.log(error);
    }
  })
  
  Emitter.once("QUESTION_PATCH", (data: QuestionStatement) => {
    // Hide Question SingleForm
    setQuestion({ ...question, edit: false });
  });

  function handleQuestionDelete(id:string) {
    
    deleteQuestion(id).then(resp => {
      console.log(resp);
      Emitter.emit("QUESTION_DELETE", id);
    })
    
  }

  return (
    <div className="relative">
      <div className="rounded overflow-hidden  shadow-lg p-3">
        <div className="space-y-3">
          {/* Question */}
          {!question.edit && <Statement text={item.statement} />}

          {question.edit && <SingleForm placeholder="question.." event="QUESTION_PATCH" id={questionId}/>}


          <div className="ml-5 space-y-3 ">

            <form >
            {/* Answer Radio */}
            {item.options.map(option => {
              return(
                <div className="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="default-radio-1" className="ml-2 text-sm  text-gray-900 dark:text-gray-300">{option.content}</label>
                </div>

              )
            })}
              {/* <div className="flex items-center">
                <input defaultChecked id="default-radio-2" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-radio-2" className="ml-2 text-sm  text-gray-900 dark:text-gray-300">Checked state</label>
              </div> */}
            </form>

            {/* Add Answer Button */}
            <button className="text-sm ">
              {/* <a href="#" className=""></a> */}
              + Add Answer
            </button>
          </div>

          <hr />

          {/* Feedback */}
          {/* <SingleForm placeholder="feedback.." /> */}
          <span className="float-right">id : {item.id}</span>
          <Statement text="This is Feedback Statement" />

        </div>
      </div>
      <button
        onClick={() => handleQuestionDelete(item.id)}
        type="button" style={{ top: '-4px', right: '-17px', height: 40 }}
        className="shadow-lg absolute w-fit flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>

      </button>
    </div>
  )
}
