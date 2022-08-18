import React, { ReactNode } from "react";

const ChangeSeenButtonContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className='max-w-md flex items-center justify-center gap-2 min-h-full'>
      {children}
    </div>
  );
};

export default ChangeSeenButtonContainer;
