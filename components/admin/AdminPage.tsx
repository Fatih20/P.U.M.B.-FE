import React, { useState } from "react";
import ChangeSeenButton from "../ChangeSeenButton";
import ChangeSeenButtonContainer from "../ChangeSeenButtonContainer";
import AdminCourses from "./AdminCourses";
import AdminTeachers from "./AdminTeachers";

type AdminPageProps = {
  //   courses: Course[];
  //   teachers: Teacher[];
};

const AdminPage = ({}: AdminPageProps) => {
  const [seeCourses, setSeeCourses] = useState(false);

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
