import { useRouter } from "next/router";
import React from "react";
import useMe from "../hooks/useMe";
import BaseLayout from "../layout/BaseLayout";
import AdminPage from "../components/admin/AdminCourses";

type Props = {};

const Admin = (props: Props) => {
  const { user, isLoading: userIsLoading, error: errorGettingMe } = useMe();
  const router = useRouter();

  if (userIsLoading) {
    console.log("Bruh2");
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
