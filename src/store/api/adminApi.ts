import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ── Auth ──────────────────────────────────────────────────────────
export interface AdminLoginRequest { name: string; password: string; }
export interface AdminLoginResponse { id: number; name: string; profileImage: string; accessToken: string; refreshToken: string; }

// ── Companies ────────────────────────────────────────────────────
export interface Company { id: number; name: string; type: string; description: string; createdAt: string; updatedAt: string; }
export interface CreateCompanyRequest { name: string; type: string; description: string; }
export interface UpdateCompanyRequest { name: string; type: string; description: string; }

// ── Staff ─────────────────────────────────────────────────────────
export interface Staff { id: number; companyId: number; companyName: string; name: string; email: string; profileImage: string; createdAt: string; updatedAt: string; }
export interface CreateStaffRequest { name: string; email: string; password: string; confirmPassword: string; companyId: number; }
export interface UpdateStaffRequest { name: string; email: string; companyId: number; }
export interface StaffLoginRequest { email: string; password: string; }
export interface StaffLoginResponse { id: number; name: string; email: string; companyId: number; companyName: string; profileImage: string; accessToken: string; refreshToken: string; }

// ── Reward ────────────────────────────────────────────────────────
export interface Reward { id: number; companyId: number; companyName: string; name: string; description: string; stock: number; pointRequired: number; image: string; createdAt: string; updatedAt: string; }
export interface CreateRewardRequest { name: string; description: string; stock: number; pointRequired: number; companyId: number; image?: File | null; }
export interface UpdateRewardRequest { name: string; description: string; stock: number; pointRequired: number; companyId: number; }

// ── Customer (User) ───────────────────────────────────────────────
export interface Customer { id: number; companyId: number; companyName: string; name: string; email: string; points: number; profileImage: string; createdAt: string; updatedAt: string; }
export interface UserLoginRequest { email: string; password: string; }
export interface UserLoginResponse { id: number; companyId: number; companyName: string; name: string; email: string; points: number; profileImage: string; accessToken: string; refreshToken: string; }
export interface UserRegisterRequest { companyId: number; name: string; email: string; password: string; confirmPassword: string; }
export interface UserRegisterResponse { id: number; companyId: number; companyName: string; name: string; email: string; points: number; accessToken: string; refreshToken: string; }
export interface UserProfileResponse { id: number; companyId: number; companyName: string; name: string; email: string; points: number; profileImage: string; createdAt: string; updatedAt: string; }

// Helper: read cookie value by name (client-side only)
function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=").slice(1).join("=");
}

// ── API ───────────────────────────────────────────────────────────
export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            const token = getCookie("admin_token");
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Company", "Staff", "Reward", "Customer"],
    endpoints: (builder) => ({
        // Auth
        adminLogin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
            query: (credentials) => ({ url: "/api/admins/login", method: "POST", body: credentials }),
        }),
        staffLogin: builder.mutation<StaffLoginResponse, StaffLoginRequest>({
            query: (credentials) => ({ url: "/api/staff/login", method: "POST", body: credentials }),
        }),

        // Companies
        getCompanies: builder.query<Company[], void>({ query: () => "/api/admins/companies", providesTags: ["Company"] }),
        getPublicCompanies: builder.query<Company[], void>({ query: () => "/api/users/companies" }),
        getCompany: builder.query<Company, number>({ query: (id) => `/api/admins/companies/${id}`, providesTags: (_r, _e, id) => [{ type: "Company", id }] }),
        createCompany: builder.mutation<{ message: string; data: Company }, CreateCompanyRequest>({
            query: (body) => ({ url: "/api/admins/companies", method: "POST", body }),
            invalidatesTags: ["Company"],
        }),
        updateCompany: builder.mutation<{ message: string; data: Company }, { id: number; body: UpdateCompanyRequest }>({
            query: ({ id, body }) => ({ url: `/api/admins/companies/${id}`, method: "PUT", body }),
            invalidatesTags: (_r, _e, { id }) => [{ type: "Company", id }, "Company"],
        }),
        deleteCompany: builder.mutation<{ message: string; data: null }, number>({
            queryFn: async (id, _api, _extra, baseQuery) => {
                const result = await baseQuery({ url: `/api/admins/companies/${id}`, method: "DELETE" });
                if (result.error) return { error: result.error };
                return { data: (result.data as { message: string; data: null }) ?? { message: "Deleted", data: null } };
            },
            invalidatesTags: ["Company"],
        }),

        // Staff
        getStaffs: builder.query<Staff[], void>({ query: () => "/api/admins/staff", providesTags: ["Staff"] }),
        createStaff: builder.mutation<{ message: string; data: Staff }, CreateStaffRequest>({
            query: (body) => ({ url: "/api/admins/staff", method: "POST", body }),
            invalidatesTags: ["Staff"],
        }),
        updateStaff: builder.mutation<{ message: string; data: Staff }, { id: number; body: UpdateStaffRequest }>({
            query: ({ id, body }) => ({ url: `/api/admins/staff/${id}`, method: "PUT", body }),
            invalidatesTags: (_r, _e, { id }) => [{ type: "Staff", id }, "Staff"],
        }),
        deleteStaff: builder.mutation<{ message: string; data: null }, number>({
            queryFn: async (id, _api, _extra, baseQuery) => {
                const result = await baseQuery({ url: `/api/admins/staff/${id}`, method: "DELETE" });
                if (result.error) return { error: result.error };
                return { data: (result.data as { message: string; data: null }) ?? { message: "Deleted", data: null } };
            },
            invalidatesTags: ["Staff"],
        }),

        // Rewards
        getRewards: builder.query<Reward[], void>({ query: () => "/api/admins/rewards", providesTags: ["Reward"] }),
        createReward: builder.mutation<{ message: string; data: Reward }, FormData>({
            query: (formData) => ({ url: "/api/admins/rewards", method: "POST", body: formData }),
            invalidatesTags: ["Reward"],
        }),
        updateReward: builder.mutation<{ message: string; data: Reward }, { id: number; body: FormData }>({
            query: ({ id, body }) => ({ url: `/api/admins/rewards/${id}`, method: "PUT", body }),
            invalidatesTags: (_r, _e, { id }) => [{ type: "Reward", id }, "Reward"],
        }),
        deleteReward: builder.mutation<{ message: string; data: null }, number>({
            queryFn: async (id, _api, _extra, baseQuery) => {
                const result = await baseQuery({ url: `/api/admins/rewards/${id}`, method: "DELETE" });
                if (result.error) return { error: result.error };
                return { data: (result.data as { message: string; data: null }) ?? { message: "Deleted", data: null } };
            },
            invalidatesTags: ["Reward"],
        }),

        // User Auth
        userLogin: builder.mutation<UserLoginResponse, UserLoginRequest>({
            query: (body) => ({ url: "/api/users/login", method: "POST", body }),
        }),
        userRegister: builder.mutation<UserRegisterResponse, UserRegisterRequest>({
            query: (body) => ({ url: "/api/users/register", method: "POST", body }),
        }),
        userLogout: builder.mutation<void, string>({
            query: (token) => ({ url: "/api/users/logout", method: "POST", headers: { Authorization: `Bearer ${token}` } }),
        }),

        // Customers (admin view)
        getCustomers: builder.query<Customer[], void>({ query: () => "/api/admins/users", providesTags: ["Customer"] }),
        deleteCustomer: builder.mutation<{ message: string; data: null }, number>({
            queryFn: async (id, _api, _extra, baseQuery) => {
                const result = await baseQuery({ url: `/api/admins/users/${id}`, method: "DELETE" });
                if (result.error) return { error: result.error };
                return { data: (result.data as { message: string; data: null }) ?? { message: "Deleted", data: null } };
            },
            invalidatesTags: ["Customer"],
        }),
    }),
});

export const {
    useAdminLoginMutation,
    useStaffLoginMutation,
    useGetCompaniesQuery,
    useGetPublicCompaniesQuery,
    useGetCompanyQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
    useGetStaffsQuery,
    useCreateStaffMutation,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
    useGetRewardsQuery,
    useCreateRewardMutation,
    useUpdateRewardMutation,
    useDeleteRewardMutation,
    useGetCustomersQuery,
    useDeleteCustomerMutation,
    useUserLoginMutation,
    useUserRegisterMutation,
    useUserLogoutMutation,
} = adminApi;
