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

import { useQuery } from "react-query";
import { getMe } from "../utils/api/auth";

const Home: NextPage = () => {
  const router = useRouter();
  const { data, isLoading, isFetching } = useQuery("me", getMe, {
    onSuccess: () => {
      router.push("/courses");
    },
    onError: () => {
      router.push("/login");
    },
  });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  return <h2>Redirecting...</h2>;
};

export default Home;
