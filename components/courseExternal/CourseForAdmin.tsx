import React, { useState } from "react";
import Course from "./Course";
import { CourseForAdminProps } from "@/appTypes/typesForUs";
import ApprovalButtons from "@/components/ApprovalButtons";
import { useRouter } from "next/router";

const CourseForAdmin = ({
  title,
  teacher,
  description,
  selected,
  thumbnail,
  runOnApprove,
  runOnReject,
  runOnSelect,
  id,
}: CourseForAdminProps) => {
  const router = useRouter();
  const absoluteContent = (
    <div className='absolute p-3 flex w-full top-0 bottom-0 left-0 right-0 items-start justify-end pointer-events-none'>
      <ApprovalButtons
        runOnApprove={runOnApprove}
        runOnReject={runOnReject}
        runOnSelect={runOnSelect}
        selected={selected}
        vertical={true}
      />
    </div>
  );

  const centerContent = (
    <>
      <h2 className='text-2xl font-bold whitespace-normal'>{title}</h2>
      <h3 className='whitespace-normal text-lg font-medium'>{teacher}</h3>
    </>
  );

  return (
    <Course
      goToCoursePage={() => router.push(`${router.asPath}/courses/${id}`)}
      thumbnail={thumbnail}
      absoluteContent={absoluteContent}
      centerContent={centerContent}
      title={title}
      description={description}
    ></Course>
  );
};

export default CourseForAdmin;
