import React from "react";
import { CollectiveActionButtonProps } from "../../types/typesForUs";

const CollectiveActionButtons = ({
  runOnApprove,
  runOnReject,
}: CollectiveActionButtonProps) => {
  return (
    <div className='flex justify-around items-center gap-3 w-full max-w-3xl border-t-2 border-solid border-indigo-500 pt-3'>
      <button
        onClick={runOnApprove}
        className='bg-green-500 text-white p-2 rounded-md'
      >
        Approve
      </button>
      <button
        onClick={runOnReject}
        className='bg-red-500 text-white p-2 rounded-md'
      >
        Reject
      </button>
    </div>
  );
};

export default CollectiveActionButtons;
