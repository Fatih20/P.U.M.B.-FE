import React from "react";
import { CollectiveActionButtonProps } from "../../types/typesForUs";

const CollectiveActionButtons = ({
  runOnApprove,
  runOnReject,
}: CollectiveActionButtonProps) => {
  return (
    <div className='flex justify-center items-center gap-3'>
      <button onClick={runOnApprove} className='bg-green-600 text-white p-2'>
        Approve
      </button>
      <button onClick={runOnReject} className='bg-red-600 text-white p-2'>
        Reject
      </button>
    </div>
  );
};

export default CollectiveActionButtons;
