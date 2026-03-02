import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ── Auth ──────────────────────────────────────────────────────────
export interface AdminLoginRequest {
    name: string;
    password: string;
}

export interface AdminLoginResponse {
    id: number;
    name: string;
    profileImage: string;
    accessToken: string;
    refreshToken: string;
}

// ── Companies ────────────────────────────────────────────────────
export interface Company {
    id: number;
    name: string;
    type: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCompanyRequest {
    name: string;
    type: string;
    description: string;
}

export interface UpdateCompanyRequest {
    name: string;
    type: string;
    description: string;
}

// Helper: read a cookie value by name (client-side only)
function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")
        .slice(1)
        .join("="); // handles values that contain "="
}

// ── API ───────────────────────────────────────────────────────────
export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            const token = getCookie("admin_token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Company"],
    endpoints: (builder) => ({
        // Auth
        adminLogin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
            query: (credentials) => ({
                url: "/api/admins/login",
                method: "POST",
                body: credentials,
            }),
        }),

        // Companies – Read
        getCompanies: builder.query<Company[], void>({
            query: () => "/api/admins/companies",
            providesTags: ["Company"],
        }),

        getCompany: builder.query<Company, number>({
            query: (id) => `/api/admins/companies/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Company", id }],
        }),

        // Companies – Create
        createCompany: builder.mutation<{ message: string; data: Company }, CreateCompanyRequest>({
            query: (body) => ({
                url: "/api/admins/companies",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Company"],
        }),

        // Companies – Update
        updateCompany: builder.mutation<
            { message: string; data: Company },
            { id: number; body: UpdateCompanyRequest }
        >({
            query: ({ id, body }) => ({
                url: `/api/admins/companies/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: "Company", id }, "Company"],
        }),

        // Companies – Delete
        deleteCompany: builder.mutation<{ message: string; data: null }, number>({
            query: (id) => ({
                url: `/api/admins/companies/${id}`,
                method: "DELETE",
                // Spring returns { message, data } JSON on DELETE — parse it explicitly
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const text = await response.text();
                        return Promise.reject({ status: response.status, error: text });
                    }
                    return response.json();
                },
            }),
            invalidatesTags: ["Company"],
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
} = adminApi;
