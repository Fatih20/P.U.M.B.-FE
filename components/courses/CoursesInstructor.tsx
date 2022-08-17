import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useMemo, useState } from "react";
import {
  CoursesProps,
  possibleSeenCourse,
  SeenCourse,
} from "../../types/typesForUs";
import { Course, CourseStatusInCourse } from "../../types/typesFromBackEnd";
import ChangeSeenButton from "../ChangeSeenButton";
import CourseForInstructor from "../courseExternal/CourseForInstructor";
import CoursesContainer from "./Courses";
import ChangeSeenButtonContainer from "../ChangeSeenButtonContainer";
import OverlayScreen from "../loading/OverlayScreen";
import { getCourses } from "../../utils/api/courses";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const CoursesInstructor = ({}: CoursesProps) => {
  const [seenType, setSeenType] = useState("ALL" as SeenCourse);
  const router = useRouter();

  const {
    data: courseAllData,
    error: courseAllError,
    isError: courseAllIsError,
    isLoading: courseAllIsLoading,
  } = useQuery("coursesAll", getCourses);

  const seenCourses = useMemo(
    () => courseAllData?.filter((course) => filterCourse(course, seenType)),
    [seenType, courseAllData]
  );

  if (!courseAllData || courseAllIsLoading) {
    return (
      <OverlayScreen
        displayedText='Loading courses data'
        overlayType='loading'
      />
    );
  }

  if (courseAllIsError) {
    return (
      <OverlayScreen
        displayedText='Error getting courses data'
        overlayType='error'
      />
    );
  }

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
    <div className='flex flex-col items-center py-4 flex-grow relative'>
      <div className='box-border absolute top-0 bottom-0 left-0 right-0 p-4 min-h-full flex items-end justify-end z-10 pointer-events-none'>
        <button
          className='text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center bg-indigo-600 pointer-events-auto'
          onClick={() => router.push(`${router.asPath}/create`)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ChangeSeenButtonContainer>
        {possibleSeenCourse.map((selectedSeen) =>
          createChangeSeenButton(selectedSeen)
        )}
      </ChangeSeenButtonContainer>
      {seenCourses?.length === 0 ? (
        <OverlayScreen displayedText='No courses found' />
      ) : (
        <CoursesContainer>{seenCourses?.map(mapCourse)}</CoursesContainer>
      )}
    </div>
  );
};

export default CoursesInstructor;
