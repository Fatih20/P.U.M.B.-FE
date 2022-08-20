import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BaseLayout from "@/layout/BaseLayout";
import LectureTitleForm from "@/components/Lecture/LectureTitle";
import LectureItemFactory from "@/components/Lecture/LectureItemFactory";
import { getLectureItems } from "@/utils/api/lecture";
import { useQuery } from "react-query";
import OverlayScreen from "@/components/loading/OverlayScreen";
import queryFetchingConfig from "@/config/queryFetchingConfig";

export default function LecturePage() {
  // Initiate Router
  const router = useRouter();
  const { courseId } = router.query;
  const { lectureId } = router.query;
  const queryName = `${courseId}/lecture`;
  const {
    data: lectureData,
    isError,
    isLoading,
  } = useQuery(
    queryName,
    async () => await getLectureItems(lectureId),
    queryFetchingConfig
  );

  if (isLoading || !lectureData) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Loading lecture data'
          overlayType='loading'
        />
      </BaseLayout>
    );
  }

  if (isError) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Error getting lecture data'
          overlayType='error'
        />
      </BaseLayout>
    );
  }

  return (
    <>
      <BaseLayout showBackButton={true}>
        <div className='flex flex-col justify-start items-center w-full flex-grow py-3'>
          <LectureTitleForm editable={false} courseID={courseId as string} />

          {lectureData.data.fetched && (
            <LectureItemFactory
              Items={lectureData.data}
              editable={false}
              queryName={queryName}
            />
          )}
        </div>
      </BaseLayout>
    </>
  );
}
