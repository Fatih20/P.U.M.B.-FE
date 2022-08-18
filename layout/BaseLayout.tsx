import React, { ReactNode } from "react";
import Header from "../components/Header";

type BaseLayoutProps = {
  children?: ReactNode;
  showBackButton?: boolean;
  showLogoutButton?: boolean;
  loadingbyProp?: boolean;
  loadingText?: string;
};

const BaseLayout = ({
  children,
  showBackButton = true,
  showLogoutButton = true,
}: BaseLayoutProps) => {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Header
        showBackButton={showBackButton}
        showLogoutButton={showLogoutButton}
      />

      <div className='flex justify-start items-center flex-col w-full flex-grow mt-10 px-3 md:px-4'>
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
