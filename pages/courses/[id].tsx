import React from "react";
import { useRouter } from "next/router";
import useMe from "@/hooks/useMe";
import BaseLayout from "@/layout/BaseLayout";
import CourseHeader from "@/components/courseInternal/CourseHeader";
import CourseContentContainer from "@/components/courseInternal/CourseContentContainer";
import OverlayScreen from "@/components/loading/OverlayScreen";
import { useQuery } from "react-query";
import { getCourse } from "@/utils/api/courses";
import queryFetchingConfig from "@/config/queryFetchingConfig";

type Props = {};

function idValid(id: string | string[] | undefined) {
  if (!id) {
    return "1";
  }

  if (Array.isArray(id)) {
    return id[0];
  }

  return id;
}

const CourseIndividual = (props: Props) => {
  const { user, isLoading: userLoading, error } = useMe();
  const router = useRouter();
  const { id: courseID } = router.query;
  const {
    data: courseData,
    isLoading: courseInfoLoading,
    isError,
  } = useQuery(
    `courses/${idValid(courseID)}`,
    async () => await getCourse(idValid(courseID)),
    queryFetchingConfig
  );

  if (userLoading || !user || !courseData || courseInfoLoading) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Loading course data'
          overlayType='loading'
        />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div
        className={
          "flex flex-col items-center justify-start flex-grow w-full max-w-3xl p-8 gap-3"
        }
      >
        <CourseHeader courseID={idValid(courseID)} />
        {courseData?.enrolled ? (
          <CourseContentContainer
            isTeacher={user.role === "TEACHER"}
            courseID={idValid(courseID)}
          />
        ) : (
          <div className='flex flex-grow w-full' />
        )}
      </div>
    </BaseLayout>
  );
};

export default CourseIndividual;
