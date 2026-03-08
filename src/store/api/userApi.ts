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

export interface Reward {
    id: number;
    companyId: number;
    companyName: string;
    name: string;
    description: string;
    stock: number;
    pointRequired: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface RedeemRewardResponse {
    message: string;
    data: {
        rewardName: string;
        pointsUsed: number;
        remainingPoints: number;
    };
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
    tagTypes: ["UserProfile", "Rewards"],
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
        getRewardsByCompany: builder.query<Reward[], void>({
            query: () => `/api/users/rewards`,
            providesTags: ["Rewards"],
        }),
        redeemReward: builder.mutation<RedeemRewardResponse, number>({
            query: (rewardId) => ({
                url: `/api/users/rewards/${rewardId}/redeem`,
                method: "POST",
            }),
            invalidatesTags: ["UserProfile", "Rewards"],
        }),
    }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useGetRewardsByCompanyQuery, useRedeemRewardMutation } = userApi;
