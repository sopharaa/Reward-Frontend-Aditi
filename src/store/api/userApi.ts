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
    id: number;
    userId: number;
    userName: string;
    staffId: number | null;
    staffName: string | null;
    rewardId: number;
    rewardName: string;
    pointSpend: number;
    status: "PENDING" | "ACCEPT" | "REJECT";
    createdAt: string;
    updatedAt: string;
}

export interface RedemptionResponse {
    id: number;
    userId: number;
    userName: string;
    staffId: number | null;
    staffName: string | null;
    rewardId: number;
    rewardName: string;
    pointSpend: number;
    status: "PENDING" | "ACCEPT" | "REJECT";
    createdAt: string;
    updatedAt: string;
}

export interface UserOrderResponse {
    id: number;
    staffId: number;
    staffName: string;
    userId: number;
    userName: string;
    totalAmount: number;
    pointsEarned: number;
    orderItems: { name: string; price: number }[];
    note: string;
    createdAt: string;
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
    tagTypes: ["UserProfile", "Rewards", "Redemptions", "Orders"],
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
            invalidatesTags: ["UserProfile", "Rewards", "Redemptions"],
        }),
        getMyRedemptions: builder.query<RedemptionResponse[], void>({
            query: () => "/api/users/redemptions",
            providesTags: ["Redemptions"],
        }),
        getMyOrders: builder.query<UserOrderResponse[], void>({
            query: () => "/api/users/orders",
            providesTags: ["Orders"],
        }),
    }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useGetRewardsByCompanyQuery, useRedeemRewardMutation, useGetMyRedemptionsQuery, useGetMyOrdersQuery } = userApi;



