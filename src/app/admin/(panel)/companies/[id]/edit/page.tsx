"use client";

import { use } from "react";
import { EditCompany } from "@/components/admin/companies/EditCompany";

interface Props {
    params: Promise<{ id: string }>;
}

export default function AdminEditCompanyPage({ params }: Props) {
    const { id } = use(params);
    return (
        <>
            <EditCompany id={Number(id)} />
        </>
    );
}
