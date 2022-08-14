import React, { useMemo, useState } from "react";
import {
  CoursesProps,
  possibleSeenCourse,
  SeenCourse,
} from "../../types/typesForUs";
import { Course, CourseStatusInCourse } from "../../types/typesFromBackEnd";
import ChangeSeenButton from "../ChangeSeenButton";
import CourseForInstructor from "../CourseExternal/CourseForInstructor";
import CoursesContainer from "./Courses";

const CoursesInstructor = ({ listOfCourse }: CoursesProps) => {
  const [seenType, setSeenType] = useState("ALL" as SeenCourse);
  //   console.log(listOfCourse);

  function filterCourse(
    {
      course_status: { status },
    }: {
      course_status: CourseStatusInCourse;
    },
    seenType: SeenCourse
  ) {
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

  const seenCourses = useMemo(
    () => listOfCourse.filter((course) => filterCourse(course, seenType)),
    [seenType, listOfCourse]
  );

  function createChangeSeenButton(selectedSeen: SeenCourse) {
    const buttonText = `${selectedSeen[0].toUpperCase()}${selectedSeen
      .toLowerCase()
      .substring(1, selectedSeen.length)}`;
    return (
      <ChangeSeenButton
        key={selectedSeen}
        buttonText={buttonText}
        selected={selectedSeen === seenType}
        runOnClick={() => setSeenType(selectedSeen)}
      />
    );
  }
  return (
    <div className="flex flex-col items-center py-4 min-h-full">
      <div className="max-w-md flex items-center justify-center gap-2 min-h-full">
        {possibleSeenCourse.map((selectedSeen) =>
          createChangeSeenButton(selectedSeen)
        )}
      </div>
      {seenCourses.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h2>No course found</h2>
        </div>
      ) : (
        <CoursesContainer>{seenCourses.map(mapCourse)}</CoursesContainer>
      )}
    </div>
  );
};

export default CoursesInstructor;
