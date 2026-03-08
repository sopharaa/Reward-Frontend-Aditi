import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface StaffProfileResponse {
    id: number;
    companyId: number | null;
    companyName: string | null;
    name: string;
    email: string;
    profileImage: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CompanyUserResponse {
    id: number;
    companyId: number | null;
    companyName: string | null;
    name: string;
    email: string;
    points: number;
    profileImage: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItemDto {
    name: string;
    price: number;
}

export interface CreateOrderRequest {
    userId: number;
    totalAmount: number;
    orderItems: OrderItemDto[];
    note?: string;
}

export interface OrderResponse {
    id: number;
    staffId: number;
    staffName: string;
    userId: number;
    userName: string;
    totalAmount: number;
    pointsEarned: number;
    orderItems: OrderItemDto[];
    note: string;
    createdAt: string;
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

export interface RewardItem {
    id: number;
    companyId: number;
    companyName: string;
    name: string;
    description: string;
    stock: number;
    pointRequired: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

function getStaffToken(): string | undefined {
    if (typeof document === "undefined") return undefined;
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("staff_token="))
        ?.split("=")
        .slice(1)
        .join("=");
}

export const staffApi = createApi({
    reducerPath: "staffApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            const token = getStaffToken();
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["StaffProfile", "Orders", "Redemptions", "Rewards"],
    endpoints: (builder) => ({
        getStaffProfile: builder.query<StaffProfileResponse, void>({
            query: () => "/api/staff/profile",
            providesTags: ["StaffProfile"],
        }),
        updateStaffProfile: builder.mutation<{ message: string; data: StaffProfileResponse }, FormData>({
            query: (formData) => ({
                url: "/api/staff/profile",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["StaffProfile"],
        }),
        getCompanyUsers: builder.query<CompanyUserResponse[], void>({
            query: () => "/api/staff/company-users",
        }),
        createOrder: builder.mutation<OrderResponse, CreateOrderRequest>({
            query: (body) => ({
                url: "/api/staff/orders",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Orders"],
        }),
        getMyOrders: builder.query<OrderResponse[], void>({
            query: () => "/api/staff/orders",
            providesTags: ["Orders"],
        }),
        getPendingRedemptions: builder.query<RedemptionResponse[], void>({
            query: () => "/api/staff/redemptions",
            providesTags: ["Redemptions"],
        }),
        updateRedemptionStatus: builder.mutation<RedemptionResponse, { id: number; status: "ACCEPT" | "REJECT" }>({
            query: ({ id, status }) => ({
                url: `/api/staff/redemptions/${id}`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["Redemptions"],
        }),
        getCompanyRewards: builder.query<RewardItem[], void>({
            query: () => "/api/staff/rewards",
            providesTags: ["Rewards"],
        }),
    }),
});

export const {
    useGetStaffProfileQuery,
    useUpdateStaffProfileMutation,
    useGetCompanyUsersQuery,
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetPendingRedemptionsQuery,
    useUpdateRedemptionStatusMutation,
    useGetCompanyRewardsQuery,
} = staffApi;
