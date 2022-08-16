import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  CourseContentElementProps,
  CourseContentElementType,
} from "../../types/typesForUs";
import { getLectures, getQuizzes } from "../../utils/api/courses";
import ChangeSeenButton from "../ChangeSeenButton";
import ChangeSeenButtonContainer from "../ChangeSeenButtonContainer";
import CourseContent from "./CourseContent";
import CourseContentElement from "./CourseContentElement";

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

  // function handleAddingContentType() {
  //   if (seenContentType === "lecture") {
  //     runOnAddLecture();
  //   } else {
  //     runOnAddQuiz();
  //   }
  // }

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
        className={`${isTeacher ? "" : "hidden"}`}
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
