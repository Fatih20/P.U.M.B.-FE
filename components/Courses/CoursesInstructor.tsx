import React, { useState } from "react";
import { CoursesProps, SeenCourse } from "../../types/typesForUs";
import CourseForInstructor from "../CourseExternal/CourseForInstructor";
import CoursesContainer from "./Courses";

const CoursesInstructor = ({ listOfCourse }: CoursesProps) => {
  const [seenType, setSeenType] = useState("ALL" as SeenCourse);
  console.log(listOfCourse);
  function ChangeSeenButton(selectedSeen: SeenCourse) {
    const buttonText = `${selectedSeen[0]}${selectedSeen
      .toLowerCase()
      .substring(1, selectedSeen.length)}`;
    const selected = selectedSeen === seenType;
    return (
      <button
        className={`p-2 ${selected ? "bg-gray-400" : "bg-transparent"}`}
        onClick={() => setSeenType(selectedSeen)}
      >
        {buttonText}
      </button>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-md flex items-center justify-center gap-2"></div>
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
