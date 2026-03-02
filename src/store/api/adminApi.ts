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

// ── Reward ────────────────────────────────────────────────────────
export interface Reward { id: number; companyId: number; companyName: string; name: string; description: string; stock: number; pointRequired: number; image: string; createdAt: string; updatedAt: string; }

// ── Customer (User) ───────────────────────────────────────────────
export interface Customer { id: number; companyId: number; companyName: string; name: string; email: string; points: number; profileImage: string; createdAt: string; updatedAt: string; }

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

        // Companies
        getCompanies: builder.query<Company[], void>({ query: () => "/api/admins/companies", providesTags: ["Company"] }),
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
        deleteReward: builder.mutation<{ message: string; data: null }, number>({
            queryFn: async (id, _api, _extra, baseQuery) => {
                const result = await baseQuery({ url: `/api/admins/rewards/${id}`, method: "DELETE" });
                if (result.error) return { error: result.error };
                return { data: (result.data as { message: string; data: null }) ?? { message: "Deleted", data: null } };
            },
            invalidatesTags: ["Reward"],
        }),

        // Customers
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
    useGetCompaniesQuery,
    useGetCompanyQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
    useGetStaffsQuery,
    useDeleteStaffMutation,
    useGetRewardsQuery,
    useDeleteRewardMutation,
    useGetCustomersQuery,
    useDeleteCustomerMutation,
} = adminApi;
