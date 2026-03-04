import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserProfileResponse {
    id: number;
    companyId: number;
    companyName: string;
    name: string;
    email: string;
    points: number;
    profileImage: string;
    createdAt: string;
    updatedAt: string;
}

function getUserToken(): string | undefined {
    if (typeof document === "undefined") return undefined;
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_token="))
        ?.split("=")
        .slice(1)
        .join("=");
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            const token = getUserToken();
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["UserProfile"],
    endpoints: (builder) => ({
        getUserProfile: builder.query<UserProfileResponse, void>({
            query: () => "/api/users/profile",
            providesTags: ["UserProfile"],
        }),
        updateUserProfile: builder.mutation<{ message: string; data: UserProfileResponse }, FormData>({
            query: (formData) => ({
                url: "/api/users/profile",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["UserProfile"],
        }),
    }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
