import { useState } from "react";

export function useParsePdf() {
    const [text, setText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function parsePdf(file: File) {
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/parse-pdf", {
                method: "POST",
                body: formData,
            });
            const { text } = await res.json();
            setText(text);
            return text;
        } catch (e) {
            setError("Failed to parse PDF");
        } finally {
            setIsLoading(false);
        }
    }

    return { parsePdf, text, isLoading, error };
}
