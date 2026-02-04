const TASK_URL = "/task";
import { apiSlice } from "../apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getDasboardStats: builder.query({
        query: () => ({
            url: `${TASK_URL}/dashboard`,
            method: "GET",
            Credentials: "include",
        }),
      }),
    
getAllTask: builder.query({
    query:({strQuery, isTrashed, search}) => ({
        url : `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        credentials: "include"
    })
})

    }),
});

export const {useGetDasboardStatsQuery, useGetAllTaskQuery} = taskApiSlice