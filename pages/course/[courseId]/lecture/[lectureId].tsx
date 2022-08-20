import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BaseLayout from "@/layout/BaseLayout";
import LectureTitleForm from "@/components/Lecture/LectureTitle";
import LectureItemFactory from "@/components/Lecture/LectureItemFactory";
import { getLectureItems } from "@/utils/api/lecture";

export default function LecturePage() {
  // Initiate Router
  const router = useRouter();
  const { courseId } = router.query;

  // Initiate State
  const [lectureItems, setLectureItems] = useState({
    items: [] as object[],
    fetched: false,
  });

  useEffect(() => {
    // Fetching data
    if (courseId && lectureItems.fetched == false) {
      getLectureItems(courseId).then((data) => {
        let lectureItem = data.data;
        setLectureItems({ ...lectureItems, items: lectureItem, fetched: true });
      });
    }
  });

  return (
    <>
      <BaseLayout showBackButton={true}>
        <div className='flex flex-col justify-start items-center w-full flex-grow py-3'>
          <LectureTitleForm editable={false} />

          {lectureItems.fetched && (
            <LectureItemFactory Items={lectureItems.items} editable={false} />
          )}
        </div>
      </BaseLayout>
    </>
  );
}
