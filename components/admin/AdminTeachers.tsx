import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import queryFetchingConfig from "../../config/queryFetchingConfig";
import { RejectOrApproveInput } from "../../types/typesForUs";
import {
  CourseStatusAdminModified,
  Teacher,
} from "../../types/typesFromBackEnd";
import {
  getTeachersUnverified,
  modifyTeacherStatus,
} from "../../utils/api/courses";
import CoursesContainer from "../courses/Courses";
import InstructorApplication from "./InstructorApplication";

type Props = {};

const AdminTeachers = (props: Props) => {
  const [selectedTeachers, setSelectedTeachers] = useState([] as number[]);
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
      id,
      status,
    }: {
      id: number;
      status: CourseStatusAdminModified;
    }) => {
      return await modifyTeacherStatus([id], status);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("unverified teachers");
      },
    }
  );

  function teacherMapper({ user: { email, username }, user_id: id }: Teacher) {
    return (
      <InstructorApplication
        email={email}
        id={id}
        username={username}
        key={id}
        selected={selectedTeachers.some((selectedID) => selectedID === id)}
        runOnApprove={async () =>
          await modifyTeacher({ id, status: "VERIFIED" })
        }
        runOnReject={async () =>
          await modifyTeacher({ id, status: "REJECTED" })
        }
        runOnSelect={() =>
          setSelectedTeachers((prevSelectedTeachers) => [
            ...prevSelectedTeachers,
            id,
          ])
        }
        runOnDeselect={() =>
          setSelectedTeachers((prevSelectedTeachers) =>
            prevSelectedTeachers.filter((selectedID) => selectedID !== id)
          )
        }
      />
    );
  }

  if (isTeacherVerifyingLoading) {
    return (
      <div className='flex flex-col items-center py-4 flex-grow justify-center relative'>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!teacherVerifyingData || isTeacherVerifyingError) {
    return (
      <div className='flex flex-col items-center py-4 flex-grow justify-center relative'>
        <h2>Error getting data</h2>
      </div>
    );
  }

  return (
    <CoursesContainer>
      {teacherVerifyingData.map(teacherMapper)}
    </CoursesContainer>
  );
};

export default AdminTeachers;
