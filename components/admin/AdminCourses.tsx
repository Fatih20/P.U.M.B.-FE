import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import queryFetchingConfig from "../../config/queryFetchingConfig";
import {
  Course,
  CourseStatusAdminModified,
} from "../../types/typesFromBackEnd";
import {
  getCoursesUnverified,
  modifyCourseStatus,
} from "../../utils/api/courses";
import CourseForAdmin from "../courseExternal/CourseForAdmin";
import CoursesContainer from "../courses/Courses";
import OverlayScreen from "../loading/OverlayScreen";
import CollectiveActionButtons from "./CollectiveActionButtons";
import toast from "react-hot-toast";

type Props = {};

const AdminCourses = (props: Props) => {
  const [selectedCourses, setSelectedCourses] = useState([] as number[]);
  const queryClient = useQueryClient();
  const {
    data: courseVerifyingData,
    isLoading: isCourseVerifyingLoading,
    isError: isCourseVerifyingError,
  } = useQuery("unverified courses", getCoursesUnverified, queryFetchingConfig);

  const { mutateAsync: modifyCourse } = useMutation(
    async ({
      idArray,
      status,
    }: {
      idArray: number[];
      status: CourseStatusAdminModified;
    }) => {
      return await modifyCourseStatus(idArray, status);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("unverified courses");
      },
    }
  );

  useEffect(() => {
    console.log(selectedCourses);

    return;
  }, [selectedCourses]);

  function courseMapper({
    description,
    id,
    teacher,
    thumbnail_url,
    title,
  }: Course) {
    const selected = selectedCourses.includes(id);
    const runOnSelect = () => {
      setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, id]);
    };
    const runOnDeselect = () => {
      setSelectedCourses((prevSelectedCourses) =>
        prevSelectedCourses.filter((selectedID) => selectedID !== id)
      );
    };
    return (
      <CourseForAdmin
        description={description}
        id={id}
        instructor={teacher[0].user.username}
        title={title}
        selected={selected}
        thumbnail={thumbnail_url}
        key={id}
        runOnApprove={async () => {
          const { error } = await modifyCourse({
            idArray: [id],
            status: "VERIFIED",
          });
          if (!error) {
            toast.success("Course succesfully approved");
          } else {
            toast.error("Course failed to be approve");
          }
        }}
        runOnReject={async () => {
          const { error } = await modifyCourse({
            idArray: [id],
            status: "REJECTED",
          });
          if (!error) {
            toast.success("Course succesfully rejected");
          } else {
            toast.error("Course failed to be rejected");
          }
        }}
        runOnSelect={selected ? runOnDeselect : runOnSelect}
      />
    );
  }

  if (isCourseVerifyingLoading) {
    return (
      <OverlayScreen
        displayedText='Loading courses data'
        overlayType='loading'
      />
    );
  }

  if (!courseVerifyingData || isCourseVerifyingError) {
    return (
      <OverlayScreen
        displayedText='Error getting courses data'
        overlayType='error'
      />
    );
  }

  if (courseVerifyingData.length === 0) {
    return <OverlayScreen displayedText='No courses on the waiting list' />;
  }

  return (
    <>
      <CoursesContainer>
        {courseVerifyingData.map(courseMapper)}
      </CoursesContainer>
      {selectedCourses.length === 0 ? null : (
        <CollectiveActionButtons
          runOnApprove={async () => {
            const { error } = await modifyCourse({
              idArray: selectedCourses,
              status: "VERIFIED",
            });
            if (!error) {
              toast.success("Course succesfully approved");
            } else {
              toast.error("Course failed to be approve");
            }
          }}
          runOnReject={async () => {
            const { error } = await modifyCourse({
              idArray: selectedCourses,
              status: "REJECTED",
            });
            if (!error) {
              toast.success("Selected courses succesfully rejected");
            } else {
              toast.error("Selected courses failed to be rejected");
            }
          }}
        />
      )}
    </>
  );
};

export default AdminCourses;
