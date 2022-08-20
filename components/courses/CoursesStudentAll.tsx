import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getCourses } from "@/utils/api/courses";
import CourseForStudent from "@/components/courseExternal/CourseForStudent";
import OverlayScreen from "@/components/loading/OverlayScreen";
import CoursesContainer from "@/components/courses/Courses";
import queryFetchingConfig from "@/config/queryFetchingConfig";

type Props = {};

const CoursesStudentAll = (props: Props) => {
  const {
    data: courseAllData,
    isError: courseAllIsError,
    isLoading: courseAllIsLoading,
  } = useQuery("coursesAll", getCourses, queryFetchingConfig);

  if (!courseAllData || courseAllIsLoading) {
    return (
      <OverlayScreen
        displayedText='Loading all courses'
        overlayType='loading'
      />
    );
  }

  if (courseAllIsError) {
    return (
      <OverlayScreen
        displayedText='Error getting all courses data'
        overlayType='error'
      />
    );
  }

  if (courseAllData.length === 0) {
    return <OverlayScreen displayedText='There are no course yet' />;
  }
  return (
    <CoursesContainer>
      {courseAllData.map(
        ({ id, categories, description, title, teacher, thumbnail_url }) => (
          <CourseForStudent
            id={id}
            tags={categories}
            description={description}
            teacherName={teacher[0].user.username}
            title={title}
            thumbnail={thumbnail_url}
            key={id}
          />
        )
      )}
    </CoursesContainer>
  );
};

export default CoursesStudentAll;
