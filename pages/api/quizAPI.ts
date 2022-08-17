import axios from "axios";
import { errorWrapper } from "../../utils/api/api";
import { getAccessToken } from "../../utils/utils";
import { QuizPatch, QuizPost } from "../../types/TypesForUs";

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

// POST Quiz by ID
export async function postQuiz(data:QuizPost) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    "/quizzes",
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

// POST Quiz by ID
export async function patchQuiz(id:any,data:QuizPatch) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.patch(
    `/quizzes/${id}`,
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}




