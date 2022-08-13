import axios from "axios";
import { LoginInputs, RegisterInputs } from "../../types/TypesForUs";
import { errorWrapper } from "./api";

export async function login(data:LoginInputs) {
    console.log(data);
    const errorWrappedResult = await errorWrapper(async () => await axios.post("/auth/login", {email: data.username, password: data.password}))
    return errorWrappedResult;
}

export async function signup(data:RegisterInputs) {
    const errorWrappedResult = await errorWrapper(async () => await axios.post("/auth/signup", { ...data }))
    
    return errorWrappedResult;
}