import type { NextPage } from "next";
import BaseLayout from "../layout/BaseLayout";
import { useRouter } from "next/router";
import useMe from "../hooks/useMe";
import OverlayScreen from "../components/loading/OverlayScreen";

const Home: NextPage = () => {
  const router = useRouter();
  const { user, error, isLoading } = useMe();

  if (isLoading || !user) {
    return (
      <BaseLayout>
        <OverlayScreen
          displayedText='Loading your credentials'
          overlayType='loading'
        />
      </BaseLayout>
    );
  }

  if (user.role === "ADMIN") {
    router.push("/admin");
  } else {
    router.push("/courses");
  }

  return (
    <BaseLayout>
      <OverlayScreen displayedText='Redirecting you...' />
    </BaseLayout>
  );
};

export default Home;
