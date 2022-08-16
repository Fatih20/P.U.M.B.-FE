import { useRouter } from "next/router";
import React from "react";
import AdminPage from "../components/admin/AdminPage";
import useMe from "../hooks/useMe";
import BaseLayout from "../layout/BaseLayout";

type Props = {};

const Admin = (props: Props) => {
  const { user, isLoading: userIsLoading, error: errorGettingMe } = useMe();
  const router = useRouter();

  if (userIsLoading) {
    return (
      <BaseLayout showBackButton={false} showLogoutButton={true}>
        <div className='flex flex-grow justify-center items-center'>
          <h2>Loading...</h2>
        </div>
      </BaseLayout>
    );
  }

  if (user.role !== "ADMIN") {
    router.push("/courses");
  }

  //   console.log("Bruh");

  return (
    <BaseLayout showBackButton={false}>
      <AdminPage />
    </BaseLayout>
  );
};

export default Admin;
