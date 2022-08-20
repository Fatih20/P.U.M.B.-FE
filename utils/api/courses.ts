import axios from "axios"
import { Course, CourseStatusAdminModified, CourseStatusModifier, CreateCourseInputBody, Lecture, Quiz, TeacherForAdmin } from "@/appTypes/typesFromBackEnd";
import { bearerHeader, errorWrapper } from "@/utils/api/api"

export async function getCourses() {
    const result =  await axios.get("/courses" ,bearerHeader())
    return result.data as Course[];
}

export async function getCoursesMine() {
    const result =  await axios.get("/courses/me" ,bearerHeader())
    return result.data as Course[];
}

export async function getCourse(id : string) {
    const result =  await axios.get(`/courses/${id}` ,bearerHeader())
    return result.data as Course;
}

export async function getLectures(id : string) {
    const result =  await axios.get(`/courses/${id}/lectures` ,bearerHeader())
    return result.data as Lecture[];
}

export async function getQuizzes(id : string) {
    const result =  await axios.get(`/courses/${id}/quizzes` ,bearerHeader())
    return result.data as Quiz[];
}

export async function subscribeToCourse (id : string) {
    const errorWrappedResult = errorWrapper(async () => {await axios.post(`/courses/${id}/subscribe`, {}, bearerHeader())})
    return errorWrappedResult;
}

export async function getCoursesUnverified () {
    const result =  await axios.get(`/admin/courses/` ,bearerHeader());
    return result.data as Course[];
}

export async function getTeachersUnverified () {
    const result =  await axios.get(`/admin/teachers/` ,bearerHeader());
    return result.data as TeacherForAdmin[];
}

export async function modifyCourseStatus (idArray : string[], status : CourseStatusAdminModified) {
    const requestBody = idArray.map((id) => {return {status, description : "", id} as CourseStatusModifier})
    const errorWrappedResult = errorWrapper(async () => await axios.patch(`/admin/courses`, {"updateArray" : requestBody} ,bearerHeader()));
    return errorWrappedResult;
}

export async function modifyTeacherStatus (idArray : string[], status : CourseStatusAdminModified) {
    const requestBody = idArray.map((id) => {return {status, description : "", id} as CourseStatusModifier})
    const errorWrappedResult = errorWrapper(async () =>  await axios.patch(`/admin/teachers`, {"updateArray" : requestBody} ,bearerHeader())) ;

    return errorWrappedResult;
}

export async function createCourse (createCourseInput : FormData) {
    const errorWrappedResult = errorWrapper<{data : Course}>(async () =>  await axios.post(`/courses`, createCourseInput ,bearerHeader())) ;

    return errorWrappedResult;
}


