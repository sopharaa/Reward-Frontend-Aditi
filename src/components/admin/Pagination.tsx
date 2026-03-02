"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "16px" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: "6px 12px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          backgroundColor: currentPage === 1 ? "#f3f4f6" : "white",
          color: currentPage === 1 ? "#9ca3af" : "#374151",
        }}
      >
        ‹ Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor: page === currentPage ? "#6b46c1" : "white",
            color: page === currentPage ? "white" : "#374151",
            fontWeight: page === currentPage ? "bold" : "normal",
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "6px 12px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          backgroundColor: currentPage === totalPages ? "#f3f4f6" : "white",
          color: currentPage === totalPages ? "#9ca3af" : "#374151",
        }}
      >
        Next ›
      </button>
    </div>
  );
}

