import React, { useState } from "react";
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
import CollectiveActionButtons from "./CollectiveActionButtons";

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

  function courseMapper({
    description,
    id,
    teacher,
    thumbnail_url,
    title,
  }: Course) {
    return (
      <CourseForAdmin
        description={description}
        id={id}
        instructor={teacher[0].user.username}
        title={title}
        selected={selectedCourses.some((selectedID) => selectedID === id)}
        thumbnail={thumbnail_url}
        key={id}
        runOnApprove={async () =>
          await modifyCourse({ idArray: [id], status: "VERIFIED" })
        }
        runOnReject={async () =>
          await modifyCourse({ idArray: [id], status: "REJECTED" })
        }
        runOnSelect={() =>
          setSelectedCourses((prevSelectedCourses) => [
            ...prevSelectedCourses,
            id,
          ])
        }
        runOnDeselect={() =>
          setSelectedCourses((prevSelectedCourses) =>
            prevSelectedCourses.filter((selectedID) => selectedID !== id)
          )
        }
      />
    );
  }

  if (isCourseVerifyingLoading) {
    return (
      <div className='flex flex-col items-center py-4 flex-grow justify-center relative'>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!courseVerifyingData || isCourseVerifyingError) {
    return (
      <div className='flex flex-col items-center py-4 flex-grow justify-center relative'>
        <h2>Error getting data</h2>
      </div>
    );
  }

  return (
    <>
      <CoursesContainer>
        {courseVerifyingData.map(courseMapper)}
      </CoursesContainer>
      <CollectiveActionButtons
        runOnApprove={async () =>
          await modifyCourse({ idArray: selectedCourses, status: "VERIFIED" })
        }
        runOnReject={async () =>
          await modifyCourse({ idArray: selectedCourses, status: "REJECTED" })
        }
      />
    </>
  );
};

export default AdminCourses;
