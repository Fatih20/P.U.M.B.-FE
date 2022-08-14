import React, { useState } from "react";
import {
  CoursesProps,
  possibleSeenCourse,
  SeenCourse,
} from "../../types/typesForUs";
import CourseForInstructor from "../CourseExternal/CourseForInstructor";
import CoursesContainer from "./Courses";

const CoursesInstructor = ({ listOfCourse }: CoursesProps) => {
  const [seenType, setSeenType] = useState("ALL" as SeenCourse);
  console.log(listOfCourse);
  function ChangeSeenButton({ selectedSeen }: { selectedSeen: SeenCourse }) {
    const buttonText = `${selectedSeen[0].toUpperCase()}${selectedSeen
      .toLowerCase()
      .substring(1, selectedSeen.length)}`;
    const selected = selectedSeen === seenType;
    return (
      <button
        className={`p-1 ${
          selected ? "bg-gray-400 text-white" : "bg-transparent"
        } rounded-md `}
        onClick={() => setSeenType(selectedSeen)}
      >
        {buttonText}
      </button>
    );
  }
  return (
    <div className="flex flex-col items-center py-4">
      <div className="max-w-md flex items-center justify-center gap-2">
        {possibleSeenCourse.map((seenCourse) => (
          <ChangeSeenButton key={seenCourse} selectedSeen={seenCourse} />
        ))}
      </div>
      <CoursesContainer>
        {listOfCourse.map(
          ({ id, description, title, course_status, thumbnail_url }) => (
            <CourseForInstructor
              id={id}
              status={course_status.status}
              description={description}
              title={title}
              thumbnail={thumbnail_url}
              key={id}
            />
          )
        )}
      </CoursesContainer>
    </div>
  );
};

export default CoursesInstructor;
