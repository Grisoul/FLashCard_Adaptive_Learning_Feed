// app/api/parse-pdf/route.ts
export const runtime = "nodejs";

import { extractText } from "unpdf";
import { getResolvedPDFJS } from "unpdf";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const buffer = new Uint8Array(await file.arrayBuffer());

    const { text } = await extractText(buffer, {
        mergePages: true,
    });

    return Response.json({ text });
}
