"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = async () => {
    const response = await fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    setMessage(result.message);
  };
  return (
    <main>
      <header className="App-header">
        <h1>CallMeRainyDay</h1>
        <p>Subscribe to get an email if it will rain tomorrow!</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button onClick={subscribe}>Subscribe</button>
        <p>{message}</p>
      </header>
    </main>
  );
}
