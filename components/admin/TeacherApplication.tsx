import React from "react";
import { TeacherApplicationProps } from "@/appTypes/typesForUs";
import ApprovalButtons from "@/components/ApprovalButtons";

const TeacherApplication = ({
  email,
  runOnApprove,
  runOnReject,
  runOnSelect,
  username,
  selected,
}: TeacherApplicationProps) => {
  return (
    <div className='flex text-white bg-indigo-400 rounded-lg p-3 break-all flex-col gap-2 w-full max-w-sm'>
      <div className='flex flex-col items-start justify-start w-full h-full'>
        <h3 className='text-lg font-bold'>{username}</h3>
        <h4>{email}</h4>
      </div>
      <div className='flex-grow' />
      <ApprovalButtons
        runOnApprove={runOnApprove}
        runOnReject={runOnReject}
        runOnSelect={runOnSelect}
        vertical={false}
        selected={selected}
      />
    </div>
  );
};

export default TeacherApplication;
