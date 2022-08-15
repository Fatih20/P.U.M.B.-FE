import type { NextPage } from "next";
import CourseForAdmin from "../components/CourseExternal/CourseForAdmin";
import CourseForStudent from "../components/CourseExternal/CourseForStudent";
import CourseForInstructor from "../components/CourseExternal/CourseForInstructor";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TagName from "../components/TagName";
import InstructorApplication from "../components/InstructorApplication";
import BaseLayout from "../layout/BaseLayout";

import { useRouter } from "next/router";

import { isError, useQuery } from "react-query";
import { getMe } from "../utils/api/auth";
import useMe from "../hooks/useMe";

const Home: NextPage = () => {
  const router = useRouter();
  const { user, error, isLoading } = useMe();

  if (isLoading) {
    return (
      <BaseLayout>
        <div className='flex flex-grow items-center justify-center'>
          <h2>Loading...</h2>
        </div>
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
