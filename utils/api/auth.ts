import axios from "axios";
import technicalConfig from "@/config/technicalConfig";
import { LoginInputs, RegisterInputs } from "@/appTypes/typesForUs";
import { bearerHeader, errorWrapper } from "@/utils/api/api";

export async function login(data:LoginInputs) {
    const errorWrappedResult = (errorWrapper(async () => await axios.post("/auth/login", {...data})))
    return errorWrappedResult;
}


export async function signup(data:RegisterInputs) {
    const errorWrappedResult = (errorWrapper(async () => await axios.post("/auth/signup", { ...data, confirmPassword : undefined })))
    
    return errorWrappedResult;
}

export async function deleteAccessToken() {
    localStorage.removeItem(technicalConfig.accessTokenKey);
}

export async function getMe() {
    const result = await axios.get("/auth/me", bearerHeader())
    return result;
}