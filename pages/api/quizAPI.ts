import axios from "axios";
import { errorWrapper } from "../../utils/api/api";
import { getAccessToken } from "../../utils/utils";
import { QuizPatch, QuizPost, QuestionStatement } from "../../types/typesForUs";

const config = () => {
  return {
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  };
}

export const configExternal = () => {
  return config()
}

// GET Quiz by ID
export async function getQuizById(id:any) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.get(
    `/quizzes/${id}`,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

// POST Quiz Title
export async function postQuiz(data:QuizPost) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    "/quizzes",
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

// PATCH Quiz Title by ID
export async function patchQuiz(id:any,data:QuizPatch) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.patch(
    `/quizzes/${id}`,
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

// POST Quiz Title
export async function postQuestionStatement(data:QuestionStatement) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    "/questions",
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}




