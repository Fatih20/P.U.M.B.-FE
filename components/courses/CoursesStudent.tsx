import React, { useState } from "react";
import { CoursesProps } from "@/appTypes/typesForUs";
import ChangeSeenButton from "@/components/ChangeSeenButton";
import ChangeSeenButtonContainer from "@/components/ChangeSeenButtonContainer";
import CoursesStudentAll from "@/components/courses/CoursesStudentAll";
import CoursesStudentEnrolled from "@/components/courses/CoursesStudentEnrolled";

const CoursesStudent = ({}: CoursesProps) => {
  const [seeAll, setSeeAll] = useState(true);

  return (
    <div className='flex flex-col items-center py-4 min-h-full flex-grow'>
      <ChangeSeenButtonContainer>
        <ChangeSeenButton
          buttonText='All Courses'
          runOnClick={() => {
            setSeeAll(true);
          }}
          selected={seeAll}
        />
        <ChangeSeenButton
          buttonText='My Courses'
          runOnClick={() => {
            setSeeAll(false);
          }}
          selected={!seeAll}
        />
      </ChangeSeenButtonContainer>
      {seeAll ? <CoursesStudentAll /> : <CoursesStudentEnrolled />}
    </div>
  );
};

export default CoursesStudent;
