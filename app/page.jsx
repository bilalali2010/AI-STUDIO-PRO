import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1>🚀 AI Studio Pro</h1>
      <p>All-in-one AI content generator</p>

      <Link href="/dashboard">
        <button style={{ marginTop: 20, padding: 10 }}>
          Enter Dashboard
        </button>
      </Link>
    </div>
  );
}
