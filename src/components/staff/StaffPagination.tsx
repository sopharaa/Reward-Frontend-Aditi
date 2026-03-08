import Link from "next/link";

interface Props {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export default function StaffPagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }: Props) {
    if (totalItems <= pageSize) return null;

    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, totalItems);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
        .reduce<(number | "…")[]>((acc, p, i, arr) => {
            if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…");
            acc.push(p);
            return acc;
        }, []);

    return (
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-400">
                Showing <span className="font-medium text-gray-600">{from}</span>–
                <span className="font-medium text-gray-600">{to}</span> of{" "}
                <span className="font-medium text-gray-600">{totalItems}</span>
            </p>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    ‹
                </button>
                {pages.map((item, i) =>
                    item === "…" ? (
                        <span key={`e-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                    ) : (
                        <button
                            key={item}
                            onClick={() => onPageChange(item as number)}
                            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition ${
                                currentPage === item
                                    ? "bg-green-600 text-white border-green-600"
                                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            {item}
                        </button>
                    )
                )}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    ›
                </button>
            </div>
        </div>
    );
}
