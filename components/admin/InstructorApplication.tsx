import React from "react";
import { InstructorApplicationProps } from "../../types/typesForUs";
import ApprovalButtons from "../ApprovalButtons";

const InstructorApplication = ({
  email,
  runOnApprove,
  runOnReject,
  runOnSelect,
  username,
  selected,
}: InstructorApplicationProps) => {
  return (
    <div className='flex w-64 bg-gray-300 rounded-lg p-3 break-all flex-col'>
      <div className='flex flex-col items-start justify-start w-full h-full'>
        <h3>{username}</h3>
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

export default InstructorApplication;
