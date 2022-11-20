"use client";

import { useRouter } from "next/navigation";

function Api() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        🚧 Currently under construction 🚧
      </h1>

      <button
        type="button"
        onClick={() => router.back()}
        style={{
          backgroundColor: "var(--primary-clr)",
          padding: "1rem 2rem",
          borderRadius: "30px",
          border: "none",
          color: "white",
        }}
      >
        Go back
      </button>
    </div>
  );
}

export default Api;
