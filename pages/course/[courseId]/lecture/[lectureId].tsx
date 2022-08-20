import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BaseLayout from "@/layout/BaseLayout";
import LectureTitleForm from "@/components/Lecture/lectureTitle";
import LectureItemFactory from "@/components/Lecture/LectureItemFactory";
import { getLectureItems } from "@/utils/api/lecture";
import { useQuery, QueryClient } from "react-query";

export default function LecturePage() {
  
  
  // Initiate Router
  const router = useRouter();
  const { courseId, lectureId } = router.query;

  const { data, status, error, refetch } = useQuery(["Lectures", lectureId as string], getLectureItems);

  // Initiate State
  const [lectureItems, setLectureItems] = useState({
    items: [] as object[],
    fetched: false,
  });

  return (
    <>
      <BaseLayout showBackButton={true}>
        <div className='mt-3 space-y-3 w-full '>
          <LectureTitleForm editable={false} />

          {status == "success" && (
            <LectureItemFactory Items={data?.result.data} editable={false} />
          )}
        </div>
      </BaseLayout>
    </>
  );
}
