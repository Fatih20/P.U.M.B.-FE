import OverlayScreen from "@/components/loading/OverlayScreen";
import queryFetchingConfig from "@/config/queryFetchingConfig";
import BaseLayout from "@/layout/BaseLayout";
import { getQuizById } from "@/utils/api/quiz";
import router from "next/router";
import { useQuery } from "react-query";
export default function QuizPage() {
  const { quizId } = router.query;
  const {
    data: quizIndividualData,
    isLoading: quizLoading,
    isError: quizError,
  } = useQuery(
    `quiz/${quizId}`,
    async () => await getQuizById(quizId),
    queryFetchingConfig
  );

  if (quizLoading) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Fetching the quiz'
          overlayType='loading'
        />
      </BaseLayout>
    );
  }

  if (quizError) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Failed to fetch the quiz'
          overlayType='error'
        />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout showBackButton={true}>
      <div className='mt-3 space-y-3 w-full'>
        <div>
          <h1 className='text-lg'>Title of Course</h1>
          <h1 className='text-3xl'>Title of Quiz</h1>
        </div>

        <div>
          <span>1. Question 1</span>
          <div className='space-y-3'>
            <a
              href='#'
              className='block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            >
              Option 1
            </a>
            <a
              href='#'
              className='block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            >
              Option 2
            </a>
            <a
              href='#'
              className='block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            >
              Option 3
            </a>
            <a
              href='#'
              className='block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            >
              Option 4
            </a>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
