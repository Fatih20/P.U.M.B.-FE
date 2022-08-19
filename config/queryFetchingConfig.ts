import { QueryOptions } from "react-query";
const queryFetchingConfig = {
    refetchInterval : 200,
    refetchInBackground : true,
    refetchOnReconnect : true
}

export default queryFetchingConfig;