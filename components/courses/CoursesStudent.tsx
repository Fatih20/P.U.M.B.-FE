import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { CoursesProps } from "../../types/typesForUs";
import { getCourses } from "../../utils/api/courses";
import ChangeSeenButton from "../ChangeSeenButton";
import ChangeSeenButtonContainer from "../ChangeSeenButtonContainer";
import CourseForStudent from "../courseExternal/CourseForStudent";
import OverlayScreen from "../loading/OverlayScreen";
import CoursesContainer from "./Courses";
import CoursesStudentAll from "./CoursesStudentAll";
import CoursesStudentEnrolled from "./CoursesStudentEnrolled";

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
