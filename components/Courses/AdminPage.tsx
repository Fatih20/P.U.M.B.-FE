import React from "react";
import { Lecture, Quiz } from "../../types/typesFromBackEnd";

type AdminPageProps = {
  lectures: Lecture[];
  quizzes: Quiz[];
};

const AdminPage = ({ lectures, quizzes }: AdminPageProps) => {
  return <div>AdminPage</div>;
};

export default AdminPage;
