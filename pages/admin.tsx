import { useRouter } from "next/router";
import React from "react";
import useMe from "../hooks/useMe";
import BaseLayout from "../layout/BaseLayout";

type Props = {};

const AdminPage = (props: Props) => {
  const { user, isLoading: userIsLoading, error: errorGettingMe } = useMe();
  const router = useRouter();

  if (userIsLoading) {
    return (
      <BaseLayout showBackButton={false} showLogoutButton={true}>
        <h2>Loading...</h2>
      </BaseLayout>
    );
  }

  if (errorGettingMe) {
    router.push("/");
  }

  if (user.role !== "ADMIN") {
    router.push("/");
  }

  return <div></div>;
};

export default AdminPage;
