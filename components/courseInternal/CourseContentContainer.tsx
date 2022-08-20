import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  CourseContentContainerProps,
  CourseContentElementInput,
  CourseContentElementType,
} from "@/appTypes/typesForUs";
import { getLectures, getQuizzes } from "@/utils/api/courses";
import ChangeSeenButton from "@/components/ChangeSeenButton";
import ChangeSeenButtonContainer from "@/components/ChangeSeenButtonContainer";
import CourseContent from "@/components/courseInternal/CourseContent";
import { useQueryClient } from "react-query";
import { postLectureTitle } from "@/utils/api/lecture";
import { postQuiz } from "@/utils/api/quiz";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const CourseContentContainer = ({
  courseID,
  isTeacher = false,
}: CourseContentContainerProps) => {
  const [seenContentType, setSeenContentType] = useState(
    "quiz" as CourseContentElementType
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<CourseContentElementInput>();

  useEffect(() => {
    reset();
  }, [seenContentType, reset]);

  const queryClient = useQueryClient();
  const router = useRouter();

  const quizQueryName = `${courseID}/quiz`;
  const lectureQueryName = `${courseID}/lecture`;

  async function handleCreateNewElement({ title }: CourseContentElementInput) {
    const addedContentType = seenContentType;
    const loadingToast = toast.loading(`Creating new ${addedContentType}`);
    const runToAdd =
      addedContentType === "lecture" ? postLectureTitle : postQuiz;
    const { error, result } = await runToAdd({ title, course_id: courseID });
    toast.dismiss(loadingToast);
    if (!result || error) {
      toast.error(`Error adding new ${addedContentType}`);
      return;
    }
    const { id } = result.data;
    toast.success(`Succesfully adding new ${addedContentType}`);
    queryClient.invalidateQueries(
      addedContentType === "lecture" ? lectureQueryName : quizQueryName
    );
    reset();
    router.push(`/course/${courseID}/${addedContentType}/edit/${id}`);
  }

  return (
    <div className='flex w-full gap-4 items-center flex-col flex-grow'>
      <ChangeSeenButtonContainer>
        <ChangeSeenButton
          runOnClick={() => {
            setSeenContentType("lecture");
          }}
          buttonText='Lecture'
          selected={seenContentType === "lecture"}
        />
        <ChangeSeenButton
          runOnClick={() => {
            setSeenContentType("quiz");
          }}
          buttonText='Quiz'
          selected={seenContentType === "quiz"}
        />
      </ChangeSeenButtonContainer>
      <div
        className={`flex justify-center items-center w-full ${
          isTeacher ? "" : "hidden"
        }`}
      >
        <form
          onSubmit={handleSubmit(handleCreateNewElement)}
          action='#'
          method='POST'
          className='flex flex-col md:flex-row justify-between w-full gap-3'
        >
          <input
            {...register("title", {
              required: `Title of ${seenContentType} is required`,
            })}
            className='flex-grow outline-none border-2 border-indigo-600 rounded-md py-1 px-2'
            placeholder='Title'
          />
          {formErrors.title && (
            <p className='text-red-400'>{formErrors.title.message}</p>
          )}
          <button
            type='submit'
            className='bg-indigo-600 text-white rounded-lg py-1 px-2 m-0'
          >
            Add {seenContentType}
          </button>
        </form>
      </div>
      {seenContentType === "lecture" ? (
        <CourseContent
          fetcherFunction={async () => await getLectures(courseID)}
          courseID={courseID}
          queryName={lectureQueryName}
          type={seenContentType}
          isTeacher={isTeacher}
        />
      ) : (
        <CourseContent
          fetcherFunction={async () => await getQuizzes(courseID)}
          queryName={quizQueryName}
          type={seenContentType}
          courseID={courseID}
          isTeacher={isTeacher}
        />
      )}
    </div>
  );
};

export default CourseContentContainer;
