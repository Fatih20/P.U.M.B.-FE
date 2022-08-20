import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Emitter from "@/utils/emiiter";
import BaseLayout from "@/layout/BaseLayout";
import LectureTitleForm from "@/components/Lecture/lectureTitle";
import AddDropDownButton from "@/components/Lecture/addDropDownButton";
import LectureItemFormFactory from "@/components/Lecture/LectureItemFormFactory";
import LectureItemFactory from "@/components/Lecture/LectureItemFactory";
import { getLectureItems } from "@/utils/api/lecture";
import { useQuery, QueryClient } from "react-query";

export default function LecturePage() {
  // Initiate Router
  const router = useRouter();
  const { courseId, lectureId } = router.query;

  const { data, status, error, refetch } = useQuery(["Lectures", lectureId as string], getLectureItems);

  console.log("lecture edit");
  console.log(data);

  // Initiate State
  const [lectureItemFormTrigger, setLectureItemFormTrigger] = useState({
    show: false,
    type: "",
  });
  const [lectureItems, setLectureItems] = useState({
    items: [] as object[],
    fetched: false,
  });

  // Show Hide Lecture Item Form
  function handleLectureItemFormTrigger(formType: string) {
    setLectureItemFormTrigger({
      ...lectureItemFormTrigger,
      show: true,
      type: formType,
    });
  }

  // Update LectureItems State
  function updateLectureItems(data: any) {
    let newItem = data.result.data;
    let itemsCopy = lectureItems.items;

    itemsCopy.push(newItem);

    setLectureItems({ ...lectureItems, items: itemsCopy, fetched: true });
    setLectureItemFormTrigger({
      ...lectureItemFormTrigger,
      show: false,
      type: "",
    });
  }

  Emitter.on("LECTURE_ITEM_POST", (data: any) => {
    refetch()
    setLectureItemFormTrigger({
      ...lectureItemFormTrigger,
      show: false,
      type: "",
    });
  });

  // Listening Lecture Item Delete
  Emitter.on("LECTURE_ITEM_DELETE", (data: any) => {
    try {
      let itemsCopy = lectureItems.items;
      let result = itemsCopy.filter((item: any) => {
        if (item.id != data.id) {
          return item;
        }
      });
      setLectureItems({ ...lectureItems, items: result, fetched: true });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <BaseLayout showBackButton={true}>
        <div className='space-y-3 w-full '>
          <LectureTitleForm editable={true} />

          {status === "success" && (
            <LectureItemFactory Items={data?.result.data} editable={true} />
          )}

          <div className='rounded h-fit shadow-lg bg-white'>
            {lectureItemFormTrigger.show && (
              <LectureItemFormFactory
                type={lectureItemFormTrigger.type}
                callback={updateLectureItems}
              />
            )}
          </div>

          <AddDropDownButton handleTrigger={handleLectureItemFormTrigger} />
        </div>
      </BaseLayout>
    </>
  );
}
