import React from "react";
import { useRouter } from "next/router";
import useMe from "@/hooks/useMe";
import BaseLayout from "@/layout/BaseLayout";
import CourseHeader from "@/components/courseInternal/CourseHeader";
import CourseContentContainer from "@/components/courseInternal/CourseContentContainer";
import OverlayScreen from "@/components/loading/OverlayScreen";
import { idValid } from "@/utils/utils";

type Props = {};

const CourseIndividual = (props: Props) => {
  const { user, isLoading, error } = useMe();
  const router = useRouter();
  const { id } = router.query;

  if (isLoading || !user) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText="Loading course data"
          overlayType="loading"
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
