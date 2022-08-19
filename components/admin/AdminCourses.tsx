import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import queryFetchingConfig from "@/config/queryFetchingConfig";
import { Course, CourseStatusAdminModified } from "@/appTypes/typesFromBackEnd";
import { getCoursesUnverified, modifyCourseStatus } from "@/utils/api/courses";
import CourseForAdmin from "@/components/courseExternal/CourseForAdmin";
import CoursesContainer from "@/components/courses/Courses";
import OverlayScreen from "@/components/loading/OverlayScreen";
import CollectiveActionButtons from "@/components/admin/CollectiveActionButtons";
import toast from "react-hot-toast";

type Props = {};

const AdminCourses = (props: Props) => {
  const [selectedCourses, setSelectedCourses] = useState([] as string[]);
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
      idArray: string[];
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
    const approveOrRejectFactory = (isApprove: boolean) => {
      return async () => {
        const loadingToast = toast.loading(
          `${isApprove ? "Approving" : "Rejecting"} application`
        );
        const warningText = isApprove ? "approved" : "rejected";
        const { error } = await modifyCourse({
          idArray: [id],
          status: isApprove ? "VERIFIED" : "REJECTED",
        });
        toast.dismiss(loadingToast);
        if (!error) {
          toast.success(`Course succesfully ${warningText}`);
        } else {
          toast.error(`Course failed to be ${warningText}`);
        }
      };
    };
    return (
      <CourseForAdmin
        description={description}
        id={id}
        teacher={teacher[0].user.username}
        title={title}
        selected={selected}
        thumbnail={thumbnail_url}
        key={id}
        runOnApprove={approveOrRejectFactory(true)}
        runOnReject={approveOrRejectFactory(false)}
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
