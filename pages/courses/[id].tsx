import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getLecture } from "../../utils/api/courses";

type Props = {};

function idValid(id: string | string[] | undefined) {
  if (!id) {
    return false;
  }
  if (Array.isArray(id)) {
    return false;
  }

  try {
    const validId = parseInt(id);
    return true;
  } catch {
    return false;
  }
}

const CourseIndividual = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const processedID = Array.isArray(id ?? "1") ? (id ?? "1")[0] : id;
  // const {
  //   data: courseData,
  //   isLoading : i,
  //   isError,
  // } = useQuery(`courses/${id}`, getCourse);

  // const { data: lectureData, isLoading } = useQuery(
  //   `course/${id}/lecture`,
  //   async () => getLecture(id)
  // );

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
// }

export default CourseIndividual;
