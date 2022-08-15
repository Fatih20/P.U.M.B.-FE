import React from "react";
import SecondHeader from "../components/SecondHeader";

type BaseLayoutProps = {
  children: JSX.Element | JSX.Element[];
  showBackButton: Boolean;
};

const SecondBaseLayout = ({ children, showBackButton }: BaseLayoutProps) => {
  return (
    <>
    <SecondHeader showBackButton={showBackButton} />
    <div className="container mx-auto w-70">
      <div className="min-h-full flex items-center justify-center py-20 px-6 sm:px-10 md:px-20 lg:px-48">
          {children}
      </div>
    </div>
    </>
  );
};

export default SecondBaseLayout;
