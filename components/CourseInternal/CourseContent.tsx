import React, { useState } from "react";
import {
  CourseContentElementProps,
  CourseContentElementType,
} from "../../types/types";
import CourseContentElement from "./CourseContentElement";

type CourseContentProps = {
  courseContentComponents: CourseContentElementProps[];
  runOnAddQuiz: () => void;
  runOnAddLecture: () => void;
};

const CourseContent = ({
  courseContentComponents,
  runOnAddLecture,
  runOnAddQuiz,
}: CourseContentProps) => {
  const [seenContentType, setSeenContentType] = useState(
    "quiz" as CourseContentElementType
  );

  function handleAddingContentType() {
    if (seenContentType === "lecture") {
      runOnAddLecture();
    } else {
      runOnAddQuiz();
    }
  }

  return (
    <div className="flex w-full gap-4 items-center flex-col">
      <div className="flex gap-4">
        <button
          onClick={() => {
            setSeenContentType("lecture");
          }}
        >
          Lectures
        </button>
        <button
          onClick={() => {
            setSeenContentType("quiz");
          }}
        >
          Quiz
        </button>
      </div>
      <button onClick={handleAddingContentType}>Add {seenContentType}</button>
      <div className="flex flex-col w-full ">
        {courseContentComponents.map(
          ({ title, type, runOnDelete, runOnEdit }) => {
            return (
              <CourseContentElement
                key={title}
                title={title}
                runOnDelete={runOnDelete}
                runOnEdit={runOnEdit}
                type={type}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default CourseContent;
