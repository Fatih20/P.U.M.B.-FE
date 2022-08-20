import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Emitter from "@/utils/emiiter";
import BaseLayout from "@/layout/BaseLayout";
import QuizTitleForm from "@/components/Quiz/QuizTitle";
import {
  getQuizById,
  patchQuiz,
  postQuestionStatement,
  deleteQuestion
} from "@/utils/api/quiz";
import { QuizPatch, QuestionStatement, QuestionType } from "@/appTypes/typesForUs";
import AddQuestionButton from "@/components/Quiz/AddQuestionButton";
import QuestionFactory from "@/components/Quiz/QuestionFactory";
import { useQuery, QueryClient } from "react-query";
import queryFetchingConfig from "@/config/queryFetchingConfig";
import useMe from "@/hooks/useMe";



export default function QuizPage() {
  const { user, isLoading: userLoading } = useMe();

  // Initiate Router
  const router = useRouter()
  const { quizId } = router.query

  // Initiate State
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([] as QuestionType[]);

  // React Query
  const queryClient = new QueryClient();
  const { data, status, error, refetch } = useQuery(["Quiz", quizId as string], getQuizById);

  // console.log("main page");
  // console.log(data);

  // Listening on Question Create New
  Emitter.on('REFETCH', (data: any) => {
    refetch()
  });

  // Listening on Question Create New
  Emitter.on('QUESTION_POST', (data: any) => {
    refetch()
  });

   // Listening on Question Create New
   Emitter.on('OPTION_POST', (data: any) => {
    refetch()
  });

  // Listening on Question Edit
  Emitter.on('QUESTION_PATCH', (data: QuestionStatement) => {
    refetch()
  });

  // Listening to Question Delete
  Emitter.on('QUESTION_DELETE', (id: string) => {
    let itemsCopy = questions
    let result = itemsCopy.filter((item: any) => {
      if (item.id != id) {
        return item
      }
    })
    refetch()
  })

  // Listening Quiz Title Edit
  Emitter.once('QUIZ_PATCH', (data: QuizPatch) => {
    if (typeof quizId !== 'undefined') {
      patchQuiz(quizId, data).then(resp => {
        // console.log(resp);
        queryClient.invalidateQueries("Quiz");
        refetch()
      })
    }
  });


  return (
    <>
      <BaseLayout showBackButton={true}>
        <div className="mt-3 space-y-3 w-full">
          {data?.result  && <QuizTitleForm text={data?.result.data.title} editable={true} />}

          {data?.result  && <QuestionFactory Items={data?.result.data.questions} />}
          
          {quizId !== undefined && <AddQuestionButton quizId={quizId as string}/>}
          

        </div>
      </BaseLayout>
    </>
  )
}
