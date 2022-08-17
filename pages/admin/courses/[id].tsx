import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getCourse, getLectures, getQuizzes } from "../../../utils/api/courses";
import technicalConfig from "../../../config/technicalConfig";
import queryFetchingConfig from "../../../config/queryFetchingConfig";
import useMe from "../../../hooks/useMe";
import BaseLayout from "../../../layout/BaseLayout";
import CourseHeader from "../../../components/courseInternal/CourseHeader";
import CourseContentContainer from "../../../components/courseInternal/CourseContentContainer";
import OverlayScreen from "../../../components/loading/OverlayScreen";

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
  const { user, isLoading, error } = useMe();
  const router = useRouter();
  const { id } = router.query;

  if (isLoading || !user) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Loading course data'
          overlayType='loading'
        />
      </BaseLayout>
    );
  }

  if (error) {
    router.push("/login");
  }

  return (
    <BaseLayout>
      <div
        className={
          "flex flex-col items-center justify-start flex-grow w-full max-w-3xl p-8"
        }
      >
        <CourseHeader courseID={idValid(id)} />
        <CourseContentContainer courseID={idValid(id)} />
      </div>
    </BaseLayout>
  );
};

export default CourseIndividual;
