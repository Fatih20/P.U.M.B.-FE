import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import queryFetchingConfig from "../../config/queryFetchingConfig";
import { RejectOrApproveInput } from "../../types/typesForUs";
import {
  CourseStatusAdminModified,
  TeacherForAdmin,
} from "../../types/typesFromBackEnd";
import {
  getTeachersUnverified,
  modifyTeacherStatus,
} from "../../utils/api/courses";
import CoursesContainer from "../courses/Courses";
import CollectiveActionButtons from "./CollectiveActionButtons";
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
      idArray,
      status,
    }: {
      idArray: number[];
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

  function teacherMapper({ username, id, email }: TeacherForAdmin) {
    const selected = selectedTeachers.some((selectedID) => selectedID === id);
    const runOnSelect = selected
      ? () =>
          setSelectedTeachers((prevSelectedTeachers) => [
            ...prevSelectedTeachers,
            id,
          ])
      : () =>
          setSelectedTeachers((prevSelectedTeachers) =>
            prevSelectedTeachers.filter((selectedID) => selectedID !== id)
          );
    return (
      <InstructorApplication
        email={email}
        id={id}
        username={username}
        key={id}
        selected={selectedTeachers.some((selectedID) => selectedID === id)}
        runOnApprove={async () =>
          await modifyTeacher({ idArray: [id], status: "VERIFIED" })
        }
        runOnReject={async () =>
          await modifyTeacher({ idArray: [id], status: "REJECTED" })
        }
        runOnSelect={runOnSelect}
        // runOnDeselect={() =>
        //   setSelectedTeachers((prevSelectedTeachers) =>
        //     prevSelectedTeachers.filter((selectedID) => selectedID !== id)
        //   )
        // }
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

  if (teacherVerifyingData.length === 0) {
    return <h2>No teacher on the waiting list</h2>;
  }

  return (
    <>
      <CoursesContainer>
        {teacherVerifyingData.map(teacherMapper)}
      </CoursesContainer>
      {selectedTeachers.length === 0 ? null : (
        <CollectiveActionButtons
          runOnApprove={async () =>
            await modifyTeacher({
              idArray: selectedTeachers,
              status: "VERIFIED",
            })
          }
          runOnReject={async () =>
            await modifyTeacher({
              idArray: selectedTeachers,
              status: "REJECTED",
            })
          }
        />
      )}
    </>
  );
};

export default AdminTeachers;
