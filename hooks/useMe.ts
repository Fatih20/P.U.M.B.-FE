import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { UseMeDataStatus } from "../types/typesForUs";
import { User } from "../types/typesFromBackEnd";
import { getMe } from "../utils/api/auth";

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