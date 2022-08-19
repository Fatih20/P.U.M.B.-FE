import axios from "axios";
import { errorWrapper } from "@/utils/api/api";
import { getAccessToken } from "@/utils/utils";
import { QuizPatch, QuizPost, QuestionStatement, OptionType } from "@/appTypes/typesForUs";

const config = () => {
  return {
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  };
}

export const configExternal = () => {
  return config()
}

// GET Quiz by ID
export async function getQuizById({queryKey}:any) {
  const [_, quizId] = queryKey

  if (quizId !== undefined){
    const errorWrappedResult = await errorWrapper(async () => await axios.get(
      `/quizzes/${quizId}`,
      config()
    ).then().catch(console.log));
  
    return errorWrappedResult;
  }

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

// POST Question Statement
export async function postQuestionStatement(data:QuestionStatement) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    "/questions",
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

// PATCH Question Statement
export async function patchQuestionStatement({id,data}:{id:any,data:any}) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.patch(
    `/questions/${id}`,
    data,
    config()
  ).then().catch(console.log));

  // return null;
  return errorWrappedResult;
}

// DELETE Question by ID
export async function deleteQuestion(id:any) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.delete(
    `/questions/${id}`,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

// POST Option
export async function postOption({data}:{data:any}) {
  
  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    "/options",
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}


