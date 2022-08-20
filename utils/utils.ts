import technicalConfig from "@/config/technicalConfig";

export function getAccessToken () {
    const candidateAccessToken = localStorage.getItem(technicalConfig.accessTokenKey)
    if (candidateAccessToken) {
        return JSON.parse(candidateAccessToken);
    } else {
        return undefined;
    };
}

export function idValid(id: string | string[] | undefined) {
    if (!id) {
      return "1";
    }
  
    if (Array.isArray(id)) {
      return id[0];
    }
  
    return id;
  }