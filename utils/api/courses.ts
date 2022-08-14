import axios from "axios"
import { Course, Lecture } from "../../types/typesFromBackEnd";
import { bearerHeader, errorWrapper } from "./api"

export async function getCourses() {
    const result =  await axios.get("/courses" ,bearerHeader())
    return result.data as Course[];
}

export async function getLecture(id:string) {
    const result =  await axios.get(`/courses/${id}/lectures` ,bearerHeader())
    return result.data as Lecture[];
}