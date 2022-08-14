import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import queryFetchingConfig from "../../config/queryFetchingConfig";
import { Course, Lecture, Quiz, Teacher } from "../../types/typesFromBackEnd";
import {
  getCoursesUnverified,
  getTeachersUnverified,
  modifyCourseStatus,
  modifyTeacherStatus,
} from "../../utils/api/courses";
import ChangeSeenButton from "../ChangeSeenButton";

type AdminPageProps = {
  //   courses: Course[];
  //   teachers: Teacher[];
};

type RejectOrApproveInput = {
  id: number;
  isCourse: Boolean;
  reject: Boolean;
};

const AdminPage = ({}: AdminPageProps) => {
  const [seeCourses, setSeeCourses] = useState(true);
  const queryClient = useQueryClient();
  const {
    data: courseVerifyingData,
    isLoading: isCourseVerifyingLoading,
    isError: isCourseVerifyingError,
  } = useQuery("unverified courses", getCoursesUnverified, queryFetchingConfig);
  const {
    data: teacherVerifyingData,
    isLoading: isteacherVerifyingLoading,
    isError: isteacherVerifyingError,
  } = useQuery(
    "unverified teachers",
    getTeachersUnverified,
    queryFetchingConfig
  );

  async function rejectOrApprove({
    id,
    reject,
    isCourse,
  }: {
    id: number;
    reject: Boolean;
    isCourse: Boolean;
  }) {
    const modifierFunction = isCourse
      ? modifyCourseStatus
      : modifyTeacherStatus;
    return await modifierFunction(id, reject ? "REJECTED" : "VERIFIED");
  }

  const { mutateAsync: modifyCourse } = useMutation(
    async (details: Omit<RejectOrApproveInput, "isCourse">) => {
      await rejectOrApprove({ ...details, isCourse: true });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("unverified courses");
      },
    }
  );

  const { mutateAsync: modifyTeacher } = useMutation(
    async (details: Omit<RejectOrApproveInput, "isCourse">) => {
      await rejectOrApprove({ ...details, isCourse: true });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("unverified teachers");
      },
    }
  );
  return (
    <div className=''>
      <div>
        <ChangeSeenButton
          runOnClick={() => {
            setSeeCourses(true);
          }}
          selected={seeCourses}
          buttonText='Courses'
        />
        <ChangeSeenButton
          runOnClick={() => {
            setSeeCourses(false);
          }}
          selected={!seeCourses}
          buttonText='Teachers'
        />
      </div>
      <div></div>
    </div>
  );
};

export default AdminPage;
