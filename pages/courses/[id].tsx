import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getCourse, getLectures, getQuizzes } from "../../utils/api/courses";
import technicalConfig from "../../config/technicalConfig";
import queryFetchingConfig from "../../config/queryFetchingConfig";

type Props = {};

function idValid(id: string | string[] | undefined) {
  if (!id) {
    return "1";
  }

  if (Array.isArray(id)) {
    return id[0];
  }

  return id;
}

const CourseIndividual = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: courseData,
    isLoading: isCourseLoading,
    isError: isCourseError,
  } = useQuery(
    `courses/${id}`,
    async () => await getCourse(idValid(id)),
    queryFetchingConfig
  );

  const {
    data: lectureData,
    isLoading: isLectureLoading,
    isError: isLectureError,
  } = useQuery(
    `course/${id}/lecture`,
    async () => getLectures(idValid(id)),
    queryFetchingConfig
  );

  const {
    data: quizData,
    isLoading: isQuizLoading,
    isError: isQuizError,
  } = useQuery(
    `course/${id}/quiz`,
    async () => getQuizzes(idValid(id)),
    queryFetchingConfig
  );

  //   if (!isLoading) {
  //     console.log(lectureData);
  //   }
  //   return <div>CourseIndividual</div>;
  // };

  // export async function getServerSideProps(context) {
  //     const res = await ;
  //     switch (res.url) {
  //         case 'checkout': {
  //             return {
  //                 props: {
  //                     //my other props
  //                 },
  //             };
  //         }
  //         default:
  //             return {
  //                 notFound: true
  //             };
  //     }
};

export default CourseIndividual;
