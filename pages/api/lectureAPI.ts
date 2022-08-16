import axios from "axios";
import { errorWrapper } from "../../utils/api/api";
import { getAccessToken } from "../../utils/utils";
import { LectureTitleType } from "../../types/TypesForUs";

const config = () => {
  return {
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  };
}

export const configExternal = () => {
  return config()
}

export async function postLectureTitle(data:LectureTitleType) {

  console.log(data);

  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    '/lectures',
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

export async function getLectures() {
  const errorWrappedResult = await errorWrapper(async () => await axios.get(
    '/lectures',
    config()
  ).then(console.log).catch(console.log));

  return errorWrappedResult;
}

export async function getLectureById(lectureId:any) {
  const errorWrappedResult = await errorWrapper(async () => await axios.get(
    `/lectures/${lectureId}`,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}