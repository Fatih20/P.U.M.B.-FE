import { getAccessToken } from "../utils";

export async function errorWrapper (checkedFunction :  () => any) {
    try {
        const result = await checkedFunction();
        return {result, error : null}
    } catch (error) {
        return {result : null, error}
    }
}

export function bearerHeader () {
    return ({
        headers : {
            "Authorization" : "Bearer" + getAccessToken()
        }
    })
}


