import SingleForm from "@/components/Quiz/SingleForm";
import Statement from "@/components/Quiz/Statement";
import { useState } from "react";
import Emitter from "@/utils/emiiter";
import { QuestionStatement } from "@/appTypes/typesForUs";
import { QuestionType } from "@/appTypes/typesForUs";
import { deleteQuestion } from "@/utils/api/quiz";
import { useMutation, QueryClient, useQuery } from "react-query";
import { postOption, patchQuestionStatement, patchOption, deleteOption, setCorrectOption, patchFeedback, getQuestionAnswer } from "@/utils/api/quiz";

export default function QuizEdit({ item, questionId }: { item: QuestionType, questionId: string }) {
  const [question, setQuestion] = useState({ edit: false });
  const [feedbackEdit, setFeedbackEdit] = useState({ edit: false });
  const [optionEdit, setOptionEdit] = useState();
  const queryClient = new QueryClient();

  const { data:questionAnswer, status, refetch } = useQuery(["QuestionAnswer", questionId], getQuestionAnswer);

  console.log("QuizEdit");
  console.log(questionAnswer);
  


  // Mutate Question PATCH
  const { mutate: patchFeedbackMutate } = useMutation(patchFeedback, {
    onSuccess: data => {
      console.log(data);
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('QuestionAnswer')
      setFeedbackEdit({edit:false})
      refetch()
    }
  });


  // Mutate SET Correct Answer
  const { mutate: setCorrectOptionMutate } = useMutation(setCorrectOption, {
    onSuccess: data => {
      console.log(data);
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('Quiz')
      Emitter.emit("REFETCH", "");
      refetch()
    }
  });

  // Mutate Option DELETE
  const { mutate: deleteOptionMutate } = useMutation(deleteOption, {
    onSuccess: data => {
      console.log(data);
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('Quiz')
      Emitter.emit("REFETCH", "");
    }
  });

  // Mutate Question PATCH
  const { mutate: patchQuestionMutate } = useMutation(patchQuestionStatement, {
    onSuccess: data => {
      console.log(data);
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('Quiz')
      Emitter.emit("QUESTION_PATCH", "");
    }
  });

  // Mutate Option POST
  const { mutate: postOptionMutate } = useMutation(postOption, {
    onSuccess: data => {
      Emitter.emit("OPTION_POST", data);
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('Quiz')
    }
  });

  // Mutate Option PATCH
  const { mutate: patchOptionMutate } = useMutation(patchOption, {
    onSuccess: data => {
      console.log(data);
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('Quiz')
      Emitter.emit("REFETCH", "");
    }
  });

  // Handle Question DELETE 
  function handleQuestionDelete(id: string) {
    deleteQuestion(id).then(resp => {
      Emitter.emit("QUESTION_DELETE", id);
    })
  }

  // Handle Option POST
  function handleAddOption() {
    const data = {
      question_id: questionId,
      content: "Answer.."
    }
    postOptionMutate({ data })
  }

  // Handle Question PATCH
  function handleQuestionPatch(id: any, data: any) {
    if (id !== undefined) {
      patchQuestionMutate({ id, data })
    }
  }

  // Handle Option PATCH
  function handleOptionPatch(id: any, formSubmit: any) {
    const data = {
      content: formSubmit.statement
    }
    setOptionEdit(undefined)
    if (id !== undefined) {
      patchOptionMutate({ id, data })
    }
  }

  // Handle Option DELETE
  function handleOptionDelete(id: any) {
    if (id !== undefined) {
      deleteOptionMutate(id)
    }
  }

  // Handle SET Correct Option
  function handleCorrectOption(optionId: any) {
    const id = questionId
    const data = {
      correct_id: optionId
    }
    if (questionId !== undefined) {
      setCorrectOptionMutate({ id, data })
    }
  }

  // Handle Feedback
  function handleFeedback(optionId: any, formSubmit: any) {
    const id = questionId
    const data = {
      feedback: formSubmit.statement
    }
    if (questionId !== undefined) {
      patchFeedbackMutate({ id, data })
    }
  }



  // Show Question SingleForm
  Emitter.once('QUESTION_STATEMENT_CLICK', () => {
    setQuestion({ ...question, edit: true })
  })

  // Show Question SingleForm
  Emitter.once('FEEDBACK_STATEMENT_CLICK', () => {
    setFeedbackEdit({ ...feedbackEdit, edit: true })
  })

  // Hide Question SingleForm
  Emitter.once("QUESTION_PATCH", (data: QuestionStatement) => {
    setQuestion({ ...question, edit: false });
  });

  function markOptionClick(id: any) {
    setOptionEdit(id)
  }


  return (
    <div className="relative">
      <div className="rounded overflow-hidden  shadow-lg p-3">
        <div className="space-y-3">
          {/* Question */}
          {!question.edit && <Statement text={item.statement} event="QUESTION_STATEMENT_CLICK" />}
          {question.edit && <SingleForm placeholder="question.." defaultValue={item.statement} callback={handleQuestionPatch} id={questionId} />}


          <div className="ml-5 space-y-3 ">

            {/* Answer Radio */}
            {item.options.map(option => {
              if (optionEdit === option.id) {
                return (
                  // Option Form
                  <div key={option.id} className="mb-5 ">
                    <SingleForm placeholder="answer.." defaultValue={option.content} callback={handleOptionPatch} id={option.id} />
                  </div>
                )
              } else {
                return (
                  // Option List
                  <div key={option.id} className="flex items-center mb-4">
                    <div className="relative w-full">
                      <input onClick={() => handleCorrectOption(option.id)}
                        // {questionAnswer == option.id }
                        checked={questionAnswer?.result.data?.correct_id == option.id}
                        type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                      <label className="ml-2 text-sm  text-gray-900 dark:text-gray-300">{option.content}</label>
                      {/* <hr /> */}
                      {/* <span>id: {option.id}</span> */}
                    </div>
                    <div className="inline-flex">
                      {/* Edit Button */}
                      <button
                        onClick={() => markOptionClick(option.id)}
                        type="button"
                        style={{ top: '-4px', right: '-17px', height: 20 }}
                        className="float-right flex items-center justify-center focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleOptionDelete(option.id)}
                        type="button"
                        style={{ top: '-4px', right: '-17px', height: 20 }}
                        className="float-right flex items-center justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              }
            })}

            {/* Add Answer Button */}
            <button onClick={handleAddOption}
              className="text-sm ">
              + Add Answer
            </button>
          </div>

          <hr />

          {/* Feedback */}
          {/* <span className="float-right">id : {item.id}</span> */}
          {!feedbackEdit.edit && questionAnswer && <Statement text={(questionAnswer?.result.data.feedback !== null) ? questionAnswer?.result.data.feedback : "feedback.." } event="FEEDBACK_STATEMENT_CLICK" />}
          {/* <SingleForm placeholder="feedback.." /> */}
            {feedbackEdit.edit && questionAnswer && <SingleForm placeholder="feedback.." callback={handleFeedback} id={questionId} defaultValue={questionAnswer?.result.data.feedback}/>}


        </div>
      </div>

      {/* Delete Button */}
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
