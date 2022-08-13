import React, { useState } from "react";
import {
  CourseContentElementProps,
  CourseContentElementType,
} from "../../types/types";

type CourseContentProps = {
  courseContent: CourseContentElementProps[];
};

const CourseContent = (props: CourseContentProps) => {
  const [seenContentType, setSeenContentType] = useState(
    "quiz" as CourseContentElementType
  );

  function handleAddingContentType() {
    if (seenContentType === "lecture") {
      // Add lectures
    } else {
      // Add quiz
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
      <div className="flex flex-col w-full "></div>
    </div>
  );
};

export default CourseContent;
