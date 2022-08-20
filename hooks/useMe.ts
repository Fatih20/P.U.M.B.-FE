import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { User } from "@/appTypes/typesFromBackEnd";
import { getMe } from "@/utils/api/auth";

function useMe () {
    const router = useRouter();
    const {data, isLoading, error, status} = useQuery("me", getMe, {
        onError : () => router.push("/login")
    })

    if (status === "error") {
        router.push("/login");
    }

    return {
        user : (data?.data) as User ?? undefined,
        isLoading,
        error
    }
}

export default useMe;