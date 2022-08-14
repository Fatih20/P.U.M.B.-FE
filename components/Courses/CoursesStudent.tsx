import React, { useState } from "react";
import { CoursesProps } from "../../types/typesForUs";
import ChangeSeenButton from "../ChangeSeenButton";
import ChangeSeenButtonContainer from "../ChangeSeenButtonContainer";
import CourseForStudent from "../CourseExternal/CourseForStudent";
import CoursesContainer from "./Courses";

const CoursesStudent = ({ listOfCourse }: CoursesProps) => {
  const [seeAll, setSeeAll] = useState(true);
  console.log(listOfCourse);
  return (
    <div className='flex flex-col items-center py-4 min-h-full'>
      <ChangeSeenButtonContainer>
        <ChangeSeenButton
          buttonText='All Courses'
          runOnClick={() => {
            return;
          }}
          selected={seeAll}
        />
        <ChangeSeenButton
          buttonText='My Courses'
          runOnClick={() => {
            return;
          }}
          selected={!seeAll}
        />
      </ChangeSeenButtonContainer>
      <CoursesContainer>
        {listOfCourse.map(
          ({ id, categories, description, title, teacher, thumbnail_url }) => (
            <CourseForStudent
              id={id}
              tags={categories}
              description={description}
              instructorName={teacher[0].user.username}
              title={title}
              thumbnail={thumbnail_url}
              key={id}
            />
          )
        )}
      </CoursesContainer>
    </div>
  );
};

export default CoursesStudent;
