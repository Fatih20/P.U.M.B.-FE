import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Emitter from "../../../../utils/emiiter";
import BaseLayout from "../../../../layout/BaseLayout";
import LectureTitleForm from "../../../../components/Lecture/lectureTitle";
import AddDropDownButton from "../../../../components/Lecture/addDropDownButton";
import LectureItemFormFactory from "../../../../components/Lecture/LectureItemFormFactory";
import LectureItemFactory from "../../../../components/Lecture/LectureItemFactory";
import { getLectureItems } from "../../../api/lectureAPI";

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
        let lectureItem = data.result.data;
        setLectureItems({ ...lectureItems, items: lectureItem, fetched: true });
      });
    }
  });

  return (
    <>
      <BaseLayout showBackButton={true}>
        <div className='space-y-3 w-full '>
          <LectureTitleForm editable={false} />

          {lectureItems.fetched && (
            <LectureItemFactory Items={lectureItems.items} editable={false} />
          )}
        </div>
      </BaseLayout>
    </>
  );
}
