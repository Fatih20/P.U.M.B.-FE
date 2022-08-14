import axios from "axios"
import { Course } from "../../types/typesFromBackEnd";
import { bearerHeader, errorWrapper } from "./api"

export async function getCourses() {
    const result =  await axios.get("/courses" ,bearerHeader())

    return result.data as Course[];
}