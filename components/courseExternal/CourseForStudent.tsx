import React, { useState } from "react";
import Course from "@/components/courseExternal/Course";
import TagName from "@/components/TagName";
import { CourseForStudentProps } from "@/appTypes/typesForUs";
import { useRouter } from "next/router";

const CourseForStudent = ({
  title,
  description,
  teacherName,
  tags,
  thumbnail,
  id,
}: CourseForStudentProps) => {
  const router = useRouter();
  const tagAndContainer = (
    <div className='absolute p-3 flex w-full top-0 bottom-0 left-0 right-0 items-start justify-end pointer-events-none'>
      <TagName
        name={tags[0].name}
        runOnClick={() => {
          return;
        }}
      />
    </div>
  );

  const centerContent = (
    <>
      <h2 className='text-2xl font-bold whitespace-normal truncate'>{title}</h2>
      <h3 className='whitespace-normal text-lg font-medium'>{teacherName}</h3>
    </>
  );
  return (
    <Course
      goToCoursePage={() => router.push(`${router.asPath}/${id}`)}
      absoluteContent={tagAndContainer}
      centerContent={centerContent}
      thumbnail={thumbnail}
      title={title}
      description={description}
    />
  );
};

export default CourseForStudent;
