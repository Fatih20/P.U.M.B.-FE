import axios from "axios"
import { Course, CourseStatusAdminModified, Lecture, Quiz, Teacher } from "../../types/typesFromBackEnd";
import { bearerHeader, errorWrapper } from "./api"

export async function getCourses() {
    const result =  await axios.get("/courses" ,bearerHeader())
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
    const result =  await axios.get(`/courses/${id}/quiz` ,bearerHeader())
    return result.data as Quiz[];
}

export async function getCoursesUnverified () {
    const result =  await axios.get(`/admin/courses/` ,bearerHeader());
    return result.data as Course[];
}

export async function getTeachersUnverified () {
    const result =  await axios.get(`/admin/teachers/` ,bearerHeader());
    return result.data as Teacher[];
}

export async function modifyCourseStatus (id : number, status : CourseStatusAdminModified) {
    const result =  await axios.patch(`/admin/courses/${id}` ,bearerHeader());
    return result;
    
}

export async function modifyTeacherStatus (id : number, status : CourseStatusAdminModified) {
    const result =  await axios.patch(`/admin/teachers/${id}` ,bearerHeader());
    return result;
}