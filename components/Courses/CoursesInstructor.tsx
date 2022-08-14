import React, { useState } from "react";
import {
  CoursesProps,
  possibleSeenCourse,
  SeenCourse,
} from "../../types/typesForUs";
import { Course, CourseStatusInCourse } from "../../types/typesFromBackEnd";
import CourseForInstructor from "../CourseExternal/CourseForInstructor";
import CoursesContainer from "./Courses";

const CoursesInstructor = ({ listOfCourse }: CoursesProps) => {
  const [seenType, setSeenType] = useState("ALL" as SeenCourse);
  console.log(listOfCourse);

  function filterCourse({
    course_status: { status },
  }: {
    course_status: CourseStatusInCourse;
  }) {
    if (seenType === "ALL") {
      return true;
    }

    return seenType === status;
  }

  function mapCourse({
    id,
    description,
    title,
    course_status,
    thumbnail_url,
  }: Course) {
    return (
      <CourseForInstructor
        id={id}
        status={course_status.status}
        description={description}
        title={title}
        thumbnail={thumbnail_url}
        key={id}
      />
    );
  }

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
    <div className="flex flex-col items-center py-4 min-h-full">
      <div className="max-w-md flex items-center justify-center gap-2 min-h-full">
        {possibleSeenCourse.map((seenCourse) => (
          <ChangeSeenButton key={seenCourse} selectedSeen={seenCourse} />
        ))}
      </div>
      {listOfCourse.filter(filterCourse).length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h2>No course found</h2>
        </div>
      ) : (
        <CoursesContainer>
          {listOfCourse.filter(filterCourse).map(mapCourse)}
        </CoursesContainer>
      )}
    </div>
  );
};

export default CoursesInstructor;
