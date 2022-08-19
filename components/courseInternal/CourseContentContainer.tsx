import { useRouter } from "next/router";
import React, { useState } from "react";
import { CourseContentElementType } from "@/appTypes/typesForUs";
import { getLectures, getQuizzes } from "@/utils/api/courses";
import ChangeSeenButton from "@/components/ChangeSeenButton";
import ChangeSeenButtonContainer from "@/components/ChangeSeenButtonContainer";
import CourseContent from "@/components/courseInternal/CourseContent";

type CourseContentProps = {
  courseID: string;
  isTeacher?: boolean;
};

const CourseContentContainer = ({
  courseID,
  isTeacher = false,
}: CourseContentProps) => {
  const [seenContentType, setSeenContentType] = useState(
    "quiz" as CourseContentElementType
  );
  const router = useRouter();

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
      <button
        onClick={() => {
          return;
        }}
        className={`${
          isTeacher ? "" : "hidden"
        } bg-indigo-600 text-white py-1 px-2 rounded-md`}
      >
        Add {seenContentType}
      </button>
      {seenContentType === "lecture" ? (
        <CourseContent
          fetcherFunction={async () => await getLectures(courseID)}
          runOnClick={(elementID: string) => {
            router.push(`${router.asPath}/${seenContentType}/${elementID}`);
          }}
          queryName={seenContentType}
          type={seenContentType}
          runOnDelete={() => {
            return;
          }}
          runOnEdit={() => {
            return;
          }}
        />
      ) : (
        <CourseContent
          fetcherFunction={async () => await getQuizzes(courseID)}
          queryName={seenContentType}
          type={seenContentType}
          runOnClick={(elementID: string) => {
            router.push(`${router.asPath}/${seenContentType}/${elementID}`);
          }}
          runOnDelete={() => {
            return;
          }}
          runOnEdit={() => {
            return;
          }}
        />
      )}
    </div>
  );
};

export default CourseContentContainer;
