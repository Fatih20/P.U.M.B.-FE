import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Emitter from "../../../../../utils/emiiter";
import BaseLayout from "../../../../../layout/BaseLayout";
import QuizTitleForm from "../../../../../components/Quiz/QuizTitle";
import {
  getQuizById,
  patchQuiz,
  postQuestionStatement,
} from "../../../../api/quizAPI";
import { QuizPatch, QuestionStatement } from "../../../../../types/typesForUs";
import AddQuestionButton from "../../../../../components/Quiz/AddQuestionButton";
import QuizEdit from "../../../../../components/Quiz/QuizEdit";

export default function LecturePage() {
  // Initiate Router
  const router = useRouter();
  const { quizId } = router.query;

  // Initiate State
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Fetching data
    if (quizId && title == "") {
      try {
        getQuizById(quizId).then((data) => {
          console.log(data);

          setTitle(data.result.data.title);
        });
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Listening Quiz Title Edit
  Emitter.once("QUIZ_PATCH", (data: QuizPatch) => {
    try {
      if (typeof quizId !== "undefined") {
        patchQuiz(quizId, data).then((resp) => {
          setTitle(data.title);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  // Listening on Question Submit
  Emitter.on("QUESTION_SUBMIT", (data: QuestionStatement) => {
    try {
      if (typeof quizId !== "undefined") {
        postQuestionStatement({
          ...data,
          quiz_id: parseInt(quizId as string),
        }).then((resp) => {
          // Butuh update question state, tapi harus fetching data dulu
          // ada masalah di requestnya ke kirim berkali"
          console.log(resp);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <BaseLayout showBackButton={true}>
        <div className='space-y-3 w-full'>
          <QuizTitleForm text={title} editable={true} />
          <QuizEdit />
          <AddQuestionButton />
        </div>
      </BaseLayout>
    </>
  );
}
