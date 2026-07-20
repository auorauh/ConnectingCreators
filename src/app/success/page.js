import Link from "next/link";

export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#444",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "#999",
          padding: "3rem",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            color: "#28a745",
            marginBottom: "1rem",
          }}
        >
          ✓
        </div>

        <h1>Thank You!</h1>

        <p style={{ margin: "1rem 0 2rem" }}>
          Your order has been placed successfully. You&apos;ll receive a confirmation
          email from Stripe shortly.
        </p>

        <Link href="/shop">
          <button
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "8px",
              background: "#000",
              color: "#fff",
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </main>
  );
}