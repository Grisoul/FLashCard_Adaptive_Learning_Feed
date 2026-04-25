'use client';

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container"
import HomeButton from "@/components/ui/home-button";
import { TiktokFrame } from "@/components/ui/tiktokframe"
import UploadButton from "@/components/ui/upload-button";
import UploadCard from "@/components/ui/upload-card"
import { HouseIcon, HouseSimpleIcon, UserCircleIcon } from "@phosphor-icons/react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useState } from "react";
import VerticalFeed from "@/components/ui/vertical-feed";

export default function Page() {
  const [notes, setNotes] = useState("");
    return (
        <Container className={`animated-gradient`}>
            <TiktokFrame className="border-3 border-accent">
                <div className="">
                    <h1 className="text-3xl font-bold">Upload Your Notes</h1>
                </div>
                <div className="flex-1 w-full flex items-center justify-center p-5">
                    {notes ? (
                      <VerticalFeed notes={notes} />
                    ) : (
                      <UploadCard onTextExtracted={setNotes} />
                    )}
                </div>
                <div className="flex w-full justify-center gap-16 items-center text-4xl">
                    <HomeButton />
                    <UploadButton />
                    <UserCircleIcon />
                </div>
            </TiktokFrame>
        </Container>
    )
}




/*
"use client";

import { useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateCards = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/generate-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await res.json();
      console.log(data);
      setResponse(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Study Generator Test</h1>

      <textarea
        placeholder="Enter your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: "100%", height: "150px", marginBottom: "10px" }}
      />

      <br />

      <button onClick={generateCards} disabled={loading}>
        {loading ? "Generating..." : "Generate Cards"}
      </button>

      {response && (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}*/
