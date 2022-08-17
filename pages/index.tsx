import type { NextPage } from "next";
import BaseLayout from "../layout/BaseLayout";
import { useRouter } from "next/router";
import useMe from "../hooks/useMe";
import OverlayScreen from "../components/loading/OverlayScreen";

const Home: NextPage = () => {
  const router = useRouter();
  const { user, error, isLoading } = useMe();

  if (isLoading) {
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
      <div className='flex flex-grow items-center justify-center'>
        <h2>Redirecting...</h2>
      </div>
    </BaseLayout>
  );
};

export default Home;
