export async function fetchFeed(body: {notes: string, batchNumber: number}) {
    try {
        const res = await fetch("/api/generate-cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data: Promise<FeedResponse> = await res.json();
        console.log(data);

        if (!res.ok)
        {
            throw new Error(data.error ?? "could not fetch");
        }

        return data;
    } catch (err) {
        console.error(err);
        throw new Error("Could not fetch");
    }
};

