import React from "react";
import useMe from "../../hooks/useMe";
import BaseLayout from "../../layout/BaseLayout";

type Props = {};

const CreateCoursePage = (props: Props) => {
  const { user } = useMe();
  return <BaseLayout></BaseLayout>;
};

export default CreateCoursePage;
