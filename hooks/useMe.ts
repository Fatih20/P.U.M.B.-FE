import  Router  from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { UseMeDataStatus } from "../types/typesForUs";
import { User } from "../types/typesFromBackEnd";
import { getMe } from "../utils/api/auth";

function useMe () {
    const {data, isLoading, error, isSuccess, isError} = useQuery("me", getMe)
    return {
        user : (data?.data) as User ?? undefined,
        isLoading,
        error
    }
}

export default useMe;