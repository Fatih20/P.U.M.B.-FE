import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import queryFetchingConfig from "@/config/queryFetchingConfig";
import {
  CourseStatusAdminModified,
  TeacherForAdmin,
} from "@/appTypes/typesFromBackEnd";
import {
  getTeachersUnverified,
  modifyTeacherStatus,
} from "@/utils/api/courses";
import CoursesContainer from "@/components/courses/Courses";
import OverlayScreen from "@/components/loading/OverlayScreen";
import CollectiveActionButtons from "@/components/admin/CollectiveActionButtons";
import TeacherApplication from "@/components/admin/TeacherApplication";
import toast from "react-hot-toast";

type Props = {};

const AdminTeachers = (props: Props) => {
  const [selectedTeachers, setSelectedTeachers] = useState([] as string[]);
  const queryClient = useQueryClient();

  const {
    data: teacherVerifyingData,
    isLoading: isTeacherVerifyingLoading,
    isError: isTeacherVerifyingError,
  } = useQuery(
    "unverified teachers",
    getTeachersUnverified,
    queryFetchingConfig
  );

  const { mutateAsync: modifyTeacher } = useMutation(
    async ({
      idArray,
      status,
    }: {
      idArray: string[];
      status: CourseStatusAdminModified;
    }) => {
      return await modifyTeacherStatus(idArray, status);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("unverified teachers");
      },
    }
  );

  const approveOrRejectFactory = (isApprove: boolean, idArray: string[]) => {
    return async () => {
      const loadingToast = toast.loading(
        `${isApprove ? "Approving" : "Rejecting"} application`
      );
      const resultText = isApprove ? "approved" : "rejected";
      const { error } = await modifyTeacher({
        idArray,
        status: isApprove ? "VERIFIED" : "REJECTED",
      });
      toast.dismiss(loadingToast);
      if (!error) {
        toast.success(`Course succesfully ${resultText}`);
      } else {
        toast.error(`Course failed to be ${resultText}`);
      }
    };
  };

  function teacherMapper({ username, id, email }: TeacherForAdmin) {
    const selected = selectedTeachers.includes(id);
    const runOnSelect = () => {
      setSelectedTeachers((prevSelectedTeachers) => [
        ...prevSelectedTeachers,
        id,
      ]);
    };
    const runOnDeselect = () => {
      setSelectedTeachers((prevSelectedTeachers) =>
        prevSelectedTeachers.filter((selectedID) => selectedID !== id)
      );
    };

    return (
      <TeacherApplication
        email={email}
        id={id}
        username={username}
        key={id}
        selected={selectedTeachers.some((selectedID) => selectedID === id)}
        runOnApprove={approveOrRejectFactory(true, [id])}
        runOnReject={approveOrRejectFactory(false, [id])}
        runOnSelect={selected ? runOnDeselect : runOnSelect}
      />
    );
  }

  if (isTeacherVerifyingLoading) {
    return (
      <OverlayScreen
        displayedText='Loading teachers data'
        overlayType='loading'
      />
    );
  }

  if (!teacherVerifyingData || isTeacherVerifyingError) {
    return (
      <OverlayScreen
        displayedText='Error getting teacher data'
        overlayType='error'
      />
    );
  }

  if (teacherVerifyingData.length === 0) {
    return <OverlayScreen displayedText='No teacher on the waiting list' />;
  }

  return (
    <>
      <CoursesContainer>
        {teacherVerifyingData.map(teacherMapper)}
      </CoursesContainer>
      {selectedTeachers.length === 0 ? null : (
        <CollectiveActionButtons
          runOnApprove={approveOrRejectFactory(true, selectedTeachers)}
          runOnReject={approveOrRejectFactory(false, selectedTeachers)}
        />
      )}
    </>
  );
};

export default AdminTeachers;
