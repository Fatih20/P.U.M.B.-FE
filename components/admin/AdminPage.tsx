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
import ChangeSeenButtonContainer from "../ChangeSeenButtonContainer";
import CourseForAdmin from "../courseExternal/CourseForAdmin";
import AdminCourses from "./AdminCourses";
import AdminTeachers from "./AdminTeachers";
import CoursesContainer from "../courses/Courses";

type AdminPageProps = {
  //   courses: Course[];
  //   teachers: Teacher[];
};

const AdminPage = ({}: AdminPageProps) => {
  const [seeCourses, setSeeCourses] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState([] as number[]);
  const queryClient = useQueryClient();

  return (
    <div className='flex flex-col items-center py-4 flex-grow relative'>
      <ChangeSeenButtonContainer>
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
      </ChangeSeenButtonContainer>
      {seeCourses ? <AdminCourses /> : <AdminTeachers />}
    </div>
  );
};

export default AdminPage;
