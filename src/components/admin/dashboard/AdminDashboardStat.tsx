"use client";

import Link from "next/link";
import { formatBangkokDateTime } from "@/utils/date";
import {
    useGetCompaniesQuery,
    useGetCustomersQuery,
    useGetStaffsQuery,
    useGetRewardsQuery,
} from "@/store/api/adminApi";

const IconBuilding = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
    </svg>
);
const IconGift = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7m0 0H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
    </svg>
);
const IconUsers = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);
const IconUser = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
);
const IconStar = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
);

export default function AdminDashboardStat() {
    const { data: companies, isLoading: loadingCompanies } = useGetCompaniesQuery();
    const { data: customers, isLoading: loadingCustomers } = useGetCustomersQuery();
    const { data: staffs, isLoading: loadingStaffs } = useGetStaffsQuery();
    const { data: rewards, isLoading: loadingRewards } = useGetRewardsQuery();

    const totalPoints = (customers ?? []).reduce((sum, c) => sum + (c.points ?? 0), 0);
    const isLoading = loadingCompanies || loadingCustomers || loadingStaffs || loadingRewards;

    const val = (n: number | undefined) =>
        isLoading ? (
            <span style={{ display: "inline-block", width: 48, height: 28, borderRadius: 6, background: "#e9e8f0", animation: "pulse 1.5s ease-in-out infinite" }} />
        ) : (
            <>{n ?? 0}</>
        );

    const stats = [
        { label: "Companies",          value: companies?.length, Icon: IconBuilding, href: "/admin/companies" },
        { label: "Rewards",            value: rewards?.length,   Icon: IconGift,     href: "/admin/rewards"   },
        { label: "Staffs",             value: staffs?.length,    Icon: IconUsers,    href: "/admin/staffs"    },
        { label: "Customers",          value: customers?.length, Icon: IconUser,     href: "/admin/customer"  },
        { label: "Total Points Issued",value: totalPoints,       Icon: IconStar,     href: "/admin/customer"  },
    ];

    const recentCustomers = [...(customers ?? [])].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5);

    const recentRewards = [...(rewards ?? [])].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5);

    const card: React.CSSProperties = {
        background: "#fff",
        borderRadius: 14,
        padding: "22px 20px",
        boxShadow: "0 1px 8px rgba(5,150,105,0.07)",
        border: "1px solid #d1fae5",
        transition: "transform 0.15s, box-shadow 0.15s",
        cursor: "pointer",
        textDecoration: "none",
        display: "block",
    };

    return (
        <div style={{ padding: "32px 28px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f7f6fb", minHeight: "100vh" }}>

            {/* Header */}
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#064e3b", margin: 0 }}>Dashboard</h1>
                <p style={{ color: "#9ca3af", marginTop: 4, fontSize: 13 }}>
                    {formatBangkokDateTime(new Date(), { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 16, marginBottom: 28 }}>
                {stats.map(({ label, value, Icon, href }) => (
                    <Link key={label} href={href} style={card}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(5,150,105,0.13)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 8px rgba(5,150,105,0.07)";
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, margin: "0 0 8px" }}>{label}</p>
                                <p style={{ fontSize: 30, fontWeight: 800, color: "#064e3b", margin: 0, lineHeight: 1 }}>
                                    {val(value)}
                                </p>
                            </div>
                            <div style={{
                                width: 42, height: 42, borderRadius: 10,
                                background: "#d1fae5",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#059669", flexShrink: 0,
                            }}>
                                <Icon />
                            </div>
                        </div>
                        <p style={{ fontSize: 11, color: "#059669", marginTop: 14, fontWeight: 600, margin: "14px 0 0" }}>
                            View all →
                        </p>
                    </Link>
                ))}
            </div>

            {/* Recent panels */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                {/* Recent Customers */}
                <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 1px 8px rgba(5,150,105,0.07)", border: "1px solid #d1fae5" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#064e3b", margin: 0 }}>Recent Customers</h3>
                        <Link href="/admin/customer" style={{ fontSize: 11, color: "#059669", fontWeight: 600, textDecoration: "none" }}>View all</Link>
                    </div>
                    {loadingCustomers ? (
                        <p style={{ color: "#6ee7b7", fontSize: 13 }}>Loading…</p>
                    ) : recentCustomers.length === 0 ? (
                        <p style={{ color: "#9ca3af", fontSize: 13 }}>No customers yet.</p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {recentCustomers.map((c) => (
                                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    {c.profileImage ? (
                                        <img src={c.profileImage} alt={c.name} style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: "2px solid #d1fae5", flexShrink: 0 }} />
                                    ) : (
                                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#d1fae5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                                            {c.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1e1b4b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</p>
                                        <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{c.companyName}</p>
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: "#059669", background: "#d1fae5", borderRadius: 20, padding: "2px 9px", whiteSpace: "nowrap" }}>
                                        {c.points} pts
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Rewards */}
                <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 1px 8px rgba(5,150,105,0.07)", border: "1px solid #d1fae5" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#064e3b", margin: 0 }}>Recent Rewards</h3>
                        <Link href="/admin/rewards" style={{ fontSize: 11, color: "#059669", fontWeight: 600, textDecoration: "none" }}>View all</Link>
                    </div>
                    {loadingRewards ? (
                        <p style={{ color: "#6ee7b7", fontSize: 13 }}>Loading…</p>
                    ) : recentRewards.length === 0 ? (
                        <p style={{ color: "#9ca3af", fontSize: 13 }}>No rewards yet.</p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {recentRewards.map((r) => (
                                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    {r.image ? (
                                        <img src={r.image} alt={r.name} style={{ width: 34, height: 34, borderRadius: 8, objectFit: "cover", border: "1px solid #d1fae5", flexShrink: 0 }} />
                                    ) : (
                                        <div style={{ width: 34, height: 34, borderRadius: 8, background: "#d1fae5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <IconGift />
                                        </div>
                                    )}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#064e3b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</p>
                                        <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{r.companyName}</p>
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: "#059669", background: "#d1fae5", borderRadius: 20, padding: "2px 9px", whiteSpace: "nowrap" }}>
                                        {r.pointRequired} pts
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.35; }
                }
            `}</style>
        </div>
    );
}
