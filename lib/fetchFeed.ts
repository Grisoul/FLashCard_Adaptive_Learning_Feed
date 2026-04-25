export async function fetchFeed(body: {notes: string, batchNumber: number}) {
    try {
        const res = await fetch("/api/generate-cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body }),
        });

        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
        throw new Error("Could not fetch");
    }
};

