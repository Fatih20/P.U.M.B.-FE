import axios from "axios"
import { Course, Lecture, Quiz } from "../../types/typesFromBackEnd";
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