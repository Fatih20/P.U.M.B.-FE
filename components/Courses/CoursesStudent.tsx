import React from "react";
import { CoursesProps } from "../../types/typesForUs";
import CourseForStudent from "../CourseExternal/CourseForStudent";
import CoursesContainer from "./Courses";

const CoursesStudent = ({ listOfCourse }: CoursesProps) => {
  console.log(listOfCourse);
  return (
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
  );
};

export default CoursesStudent;
