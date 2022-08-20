import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  CourseContentContainerProps,
  CourseContentElementType,
} from "@/appTypes/typesForUs";
import { getLectures, getQuizzes } from "@/utils/api/courses";
import ChangeSeenButton from "@/components/ChangeSeenButton";
import ChangeSeenButtonContainer from "@/components/ChangeSeenButtonContainer";
import CourseContent from "@/components/courseInternal/CourseContent";

const CourseContentContainer = ({
  courseID,
  isTeacher = false,
}: CourseContentContainerProps) => {
  const [seenContentType, setSeenContentType] = useState(
    "quiz" as CourseContentElementType
  );
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
          courseID={courseID}
          queryName={`${courseID}/${seenContentType}`}
          type={seenContentType}
          isTeacher={isTeacher}
        />
      ) : (
        <CourseContent
          fetcherFunction={async () => await getQuizzes(courseID)}
          queryName={`${courseID}/${seenContentType}`}
          type={seenContentType}
          courseID={courseID}
          isTeacher={isTeacher}
        />
      )}
    </div>
  );
};

export default CourseContentContainer;
