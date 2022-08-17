import React, { ReactNode } from "react";

const CoursesContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full min-h-full py-8 justify-center justify-items-center gap-4 items-start'>
      {children}
    </div>
  );
};

export default CoursesContainer;
