import { apiSlice } from "../apiSlice"


const AUTH_URL = "/user"

export const authApiSlice = apiSlice.injectEndponts({
   endpoints : (builder) => ({
    login: builder.mutation({
        query: (data)=> ({
            url: `${AUTH_URL}/login`,
            method: "POST",
           "body" : data,
           Credentials : true,
        })
    })
   })
})

export const {useLoginMutation} = authApiSlice