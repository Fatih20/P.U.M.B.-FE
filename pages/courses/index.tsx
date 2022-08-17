import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import CoursesInstructor from "../../components/courses/CoursesInstructor";
import CoursesStudent from "../../components/courses/CoursesStudent";
import OverlayScreen from "../../components/loading/OverlayScreen";
import useMe from "../../hooks/useMe";
import BaseLayout from "../../layout/BaseLayout";
import { getCourses } from "../../utils/api/courses";

type CoursesPage = {};

const CoursesPage = (props: CoursesPage) => {
  const { user, isLoading: userIsLoading, error: errorGettingMe } = useMe();
  const router = useRouter();
  const {
    data: courseData,
    error: courseError,
    isError: courseIsError,
    isLoading: courseIsLoading,
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

  if (courseIsLoading || !courseData || userIsLoading) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Loading courses data'
          overlayType='loading'
        />
      </BaseLayout>
    );
  }

  if (user.role === "ADMIN") {
    router.push("/admin");
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
