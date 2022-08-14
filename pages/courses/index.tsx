import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import CourseForInstructor from "../../components/CourseExternal/CourseForInstructor";
import CourseForStudent from "../../components/CourseExternal/CourseForStudent";
import CoursesInstructor from "../../components/Courses/CoursesInstructor";
import CoursesStudent from "../../components/Courses/CoursesStudent";
import useMe from "../../hooks/useMe";
import BaseLayout from "../../layout/BaseLayout";
import { Course } from "../../types/typesFromBackEnd";
import { getMe } from "../../utils/api/auth";
import { getCourses } from "../../utils/api/courses";

type CoursesPage = {};

const CoursesPage = (props: CoursesPage) => {
  const { user, isLoading: userIsLoading, error: errorGettingMe } = useMe();
  const router = useRouter();
  const {
    data: courseData,
    error: courseError,
    isError: courseIsError,
    isLoading: courseLoading,
  } = useQuery("courses", getCourses);

  if (courseIsError) {
    try {
      const statusCode = (courseError as any).response.status;
      if (statusCode >= 500) {
        return <div>Error getting data, please try again.</div>;
      } else if (statusCode >= 400) {
        router.push("/login");
      }
    } catch (error) {}
  }

  if (courseLoading || !courseData) {
    return (
      <BaseLayout showBackButton={false}>
        <div>
          <h2>Loading...</h2>
        </div>
        ;
      </BaseLayout>
    );
  }

  const UsedCoursesComponent =
    user.role === "STUDENT" ? CoursesStudent : CoursesInstructor;

  return (
    <BaseLayout showBackButton={false}>
      <UsedCoursesComponent listOfCourse={courseData} />
    </BaseLayout>
  );
};

export default CoursesPage;
