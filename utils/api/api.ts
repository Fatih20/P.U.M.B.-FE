import { getAccessToken } from "../utils";

export async function errorWrapper<T = any>(checkedFunction :  () => any) {
    try {
        const result = await checkedFunction();
        return {result : result as T | null, error : null}
    } catch (error) {
        return {result : null as T | null, error}
    }
}

export function bearerHeader () {
    return ({
        headers : {
            "Authorization" : "Bearer " + getAccessToken()
        }
    })
}


