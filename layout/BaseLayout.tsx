import React from "react";
import Header from "../components/Header";

type BaseLayoutProps = {
  children: JSX.Element | JSX.Element[];
  showBackButton: Boolean;
};

const BaseLayout = ({ children, showBackButton }: BaseLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header showBackButton={showBackButton} />
      <div className="flex justify-start items-center flex-col w-full h-full mt-8">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
