import technicalConfig from "../config/technicalConfig";

export function getAccessToken () {
    const candidateAccessToken = localStorage.getItem(technicalConfig.accessTokenKey)
    if (candidateAccessToken) {
        return JSON.parse(candidateAccessToken);
    } else {
        return undefined;
    };
}