import React, { useState } from "react";
import ChangeSeenButton from "@/components/ChangeSeenButton";
import ChangeSeenButtonContainer from "@/components/ChangeSeenButtonContainer";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminTeachers from "@/components/admin/AdminTeachers";

type AdminPageProps = {};

const AdminPage = ({}: AdminPageProps) => {
  const [seeCourses, setSeeCourses] = useState(false);

  return (
    <div className='flex flex-col items-center py-4 flex-grow relative w-full'>
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
