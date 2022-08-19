import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useMemo, useState } from "react";
import {
  CoursesProps,
  possibleSeenCourse,
  SeenCourse,
} from "@/appTypes/typesForUs";
import { Course, CourseStatusInCourse } from "@/appTypes/typesFromBackEnd";
import ChangeSeenButton from "@/components/ChangeSeenButton";
import CourseForTeacher from "@/components/courseExternal/CourseForTeacher";
import CoursesContainer from "@/components/courses/Courses";
import ChangeSeenButtonContainer from "@/components/ChangeSeenButtonContainer";
import OverlayScreen from "@/components/loading/OverlayScreen";
import { getCoursesMine } from "@/utils/api/courses";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import useMe from "@/hooks/useMe";

const CoursesTeacher = ({}: CoursesProps) => {
  const [seenType, setSeenType] = useState("ALL" as SeenCourse);
  const router = useRouter();

  const { user, isLoading: userLoading, error } = useMe();
  const {
    data: courseAllData,
    error: courseAllError,
    isError: courseAllIsError,
    isLoading: courseAllIsLoading,
  } = useQuery("coursesMineTeacher", getCoursesMine);

  const seenCourses = useMemo(
    () => courseAllData?.filter((course) => filterCourse(course, seenType)),
    [seenType, courseAllData]
  );

  if (!courseAllData || courseAllIsLoading || userLoading) {
    return (
      <OverlayScreen
        displayedText='Loading courses data and your credentials'
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
    _count: { followers },
  }: Course) {
    return (
      <CourseForTeacher
        id={id}
        status={course_status.status}
        description={description}
        title={title}
        thumbnail={thumbnail_url}
        key={id}
        peopleEnrolled={followers ?? undefined}
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
      <div className='box-border fixed top-0 bottom-0 left-0 right-0 p-4 min-h-full flex items-end justify-end z-10 pointer-events-none'>
        <button
          className={`${
            user.status === null || user.status.status !== "VERIFIED"
              ? "hidden"
              : ""
          } text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center bg-indigo-600 pointer-events-auto`}
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

export default CoursesTeacher;
