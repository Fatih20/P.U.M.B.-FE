import axios from "axios";
import { LoginInputs, RegisterInputs } from "../../types/TypesForUs";
import { bearerHeader, errorWrapper } from "./api";

export async function login(data:LoginInputs) {
    console.log(data);
    const errorWrappedResult = await errorWrapper(async () => await axios.post("/auth/login", {...data}))
    return errorWrappedResult;
}

export async function signup(data:RegisterInputs) {
    const errorWrappedResult = await errorWrapper(async () => await axios.post("/auth/signup", { ...data, confirmPassword : undefined }))
    
    return errorWrappedResult;
}

export async function getMe() {
    const errorWrappedResult = await errorWrapper(async () => await axios.get("/auth/me", bearerHeader()))
    return errorWrappedResult;
}