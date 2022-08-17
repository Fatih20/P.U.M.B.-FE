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

  if (userIsLoading || !user || userIsLoading) {
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
    return (
      <BaseLayout>
        <OverlayScreen displayedText='Redirecting' overlayType='loading' />
      </BaseLayout>
    );
  }

  const UsedCoursesComponent =
    user.role === "STUDENT" ? CoursesStudent : CoursesInstructor;

  return (
    <BaseLayout showBackButton={false}>
      <UsedCoursesComponent />
    </BaseLayout>
  );
};

export default CoursesPage;
