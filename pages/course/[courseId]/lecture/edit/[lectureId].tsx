import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Emitter from "@/utils/emiiter";
import BaseLayout from "@/layout/BaseLayout";
import LectureTitleForm from "@/components/Lecture/LectureTitle";
import AddDropDownButton from "@/components/Lecture/addDropDownButton";
import LectureItemFormFactory from "@/components/Lecture/LectureItemFormFactory";
import LectureItemFactory from "@/components/Lecture/LectureItemFactory";
import { getLectureItems } from "@/utils/api/lecture";
import OverlayScreen from "@/components/loading/OverlayScreen";
import { useQuery, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  // Initiate State
  const [lectureItemFormTrigger, setLectureItemFormTrigger] = useState({
    show: false,
    type: "",
  });

  // Show Hide Lecture Item Form
  function handleLectureItemFormTrigger(formType: string) {
    setLectureItemFormTrigger({
      ...lectureItemFormTrigger,
      show: true,
      type: formType,
    });
  }

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
        <div className='flex flex-col justify-start items-center w-full flex-grow py-3 gap-3'>
          <LectureTitleForm editable={true} courseID={courseId as string} />

          <LectureItemFactory
            Items={lectureData.data}
            editable={true}
            queryName={queryName}
          />

          <div className='rounded h-fit shadow-lg bg-white w-full'>
            {lectureItemFormTrigger.show && (
              <LectureItemFormFactory
                type={lectureItemFormTrigger.type}
                callback={() => {
                  queryClient.invalidateQueries(queryName);
                  setLectureItemFormTrigger({ show: false, type: "" });
                }}
              />
            )}
          </div>

          <AddDropDownButton handleTrigger={handleLectureItemFormTrigger} />
        </div>
      </BaseLayout>
    </>
  );
}
