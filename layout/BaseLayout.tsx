import React, { ReactNode } from "react";
import Header from "../components/Header";

type BaseLayoutProps = {
  children: ReactNode;
  showBackButton: Boolean;
};

const BaseLayout = ({ children, showBackButton }: BaseLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header showBackButton={showBackButton} />
      <div className="flex justify-start items-center flex-col w-full h-full mt-10 px-3 md:px-4">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
