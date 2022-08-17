import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getCourses, getCoursesMine } from "../../utils/api/courses";
import CourseForStudent from "../courseExternal/CourseForStudent";
import OverlayScreen from "../loading/OverlayScreen";
import CoursesContainer from "./Courses";

type Props = {};

const CoursesStudentEnrolled = (props: Props) => {
  const router = useRouter();

  const {
    data: courseEnrolledData,
    error: courseEnrolledError,
    isError: courseEnrolledIsError,
    isLoading: courseEnrolledIsLoading,
  } = useQuery("coursesEnrolled", getCoursesMine);

  if (!courseEnrolledData || courseEnrolledIsLoading) {
    return (
      <OverlayScreen
        displayedText='Loading courses you&#39;re enrolled in'
        overlayType='loading'
      />
    );
  }

  if (courseEnrolledIsError) {
    try {
      const statusCode = (courseEnrolledError as any).response.status;
      if (statusCode >= 500) {
        return (
          <OverlayScreen
            displayedText='Error getting courses, please try again'
            overlayType='error'
          />
        );
      } else if (statusCode >= 400) {
        router.push("/login");
      }
    } catch (error) {}
  }

  if (courseEnrolledData.length === 0) {
    return <OverlayScreen displayedText="You're not enrolled in any course!" />;
  }

  return (
    <CoursesContainer>
      {courseEnrolledData.map(
        ({ id, categories, description, title, teacher, thumbnail_url }) => (
          <CourseForStudent
            id={id}
            tags={categories}
            description={description}
            instructorName={teacher[0].user.username}
            title={title}
            thumbnail={thumbnail_url}
            key={id}
          />
        )
      )}
    </CoursesContainer>
  );
};

export default CoursesStudentEnrolled;
