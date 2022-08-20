import { useRouter } from "next/router";
import React from "react";
import AdminPage from "@/components/admin/AdminPage";
import OverlayScreen from "@/components/loading/OverlayScreen";
import useMe from "@/hooks/useMe";
import BaseLayout from "@/layout/BaseLayout";

type Props = {};

const Admin = (props: Props) => {
  const { user, isLoading: userIsLoading, error: errorGettingMe } = useMe();
  const router = useRouter();

  if (userIsLoading || !user) {
    return (
      <BaseLayout showBackButton={false} showLogoutButton={true}>
        <OverlayScreen
          displayedText='Loading credentials'
          overlayType='loading'
        />
      </BaseLayout>
    );
  }

  if (user.role !== "ADMIN") {
    router.push("/courses");
  }

  return (
    <BaseLayout showBackButton={false}>
      <AdminPage />
    </BaseLayout>
  );
};

export default Admin;
