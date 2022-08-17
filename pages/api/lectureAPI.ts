import axios from "axios";
import { errorWrapper } from "../../utils/api/api";
import { getAccessToken } from "../../utils/utils";
import { LectureTitlePost, LectureTitlePatch } from "../../types/TypesForUs";

const config = () => {
  return {
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  };
}

export const configExternal = () => {
  return config()
}

// GET Lecture by ID
export async function getLectureById(lectureId:any) {
  const errorWrappedResult = await errorWrapper(async () => await axios.get(
    `/lectures/${lectureId}`,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

// --- Lecture Title Start --- 
export async function postLectureTitle(data:LectureTitlePost) {

  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    '/lectures',
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

export async function patchLectureTitle(id:any,data:LectureTitlePatch) {

  console.log(id);
  console.log(data);
  

  const errorWrappedResult = await errorWrapper(async () => await axios.patch(
    `/lectures/${id}`,
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}
// --- Lecture Title End --- 

// --- Lecture Item Start --- 
export async function postLectureItem(lectureId:any,data:any) {
  console.log(data);
  
  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    `/resources`,
    data,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

export async function getLectureItems(lectureId:any) {
  const errorWrappedResult = await errorWrapper(async () => await axios.get(
    `/lectures/${lectureId}/resources`,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}

export async function deleteLectureItem(lectureId:any) {
  const errorWrappedResult = await errorWrapper(async () => await axios.delete(
    `/resources/${lectureId}`,
    config()
  ).then().catch(console.log));

  return errorWrappedResult;
}





