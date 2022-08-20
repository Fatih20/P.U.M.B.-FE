import axios from "axios";
import { errorWrapper } from "@/utils/api/api";
import { getAccessToken } from "@/utils/utils";
import { LectureTitlePost, LectureTitlePatch } from "@/appTypes/typesForUs";

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
  const result = await axios.get(
    `/lectures/${lectureId}`,
    config()
  );

  return result;
}

// --- Lecture Title Start --- 
export async function postLectureTitle(data:LectureTitlePost) {

  const errorWrappedResult = await errorWrapper(async () => await axios.post(
    '/lectures',
    data,
    config()
  ));

  return errorWrappedResult;
}

export async function patchLectureTitle(id:string, data:LectureTitlePatch) {

  const result = await axios.patch(
    `/lectures/${id}`,
    data,
    config()
  );

  return result;
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
  const result = await axios.get(
    `/lectures/${lectureId}/resources`,
    config()
  );

  return result;
}

export async function deleteLectureItem(lectureId:any) {
  const result = await axios.delete(
    `/resources/${lectureId}`,
    config()
  );

  return result;
}





