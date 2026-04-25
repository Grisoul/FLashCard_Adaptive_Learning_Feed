import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try
    {
        //Get user notes input
        const { notes, batchNumber = 1} = await req.json();

        //If input is empty, respond with an error
        if (!notes) {
            return NextResponse.json(
                { error: "Notes are Required" },
                { status: 400 }
            );
        }

        //If input is not empty, respond with test cards
        //(TODO Implement AI generation)
        const ai = new GoogleGenAI({
            apiKey: process.env.GOOGLE_API_KEY!,
        });

        const response = await ai.models.generateContent({
            model: "gemma-4-26b-a4b-it",
            contents: `
            Convert these notes into a continuous study feed

            This is batch ${batchNumber}.

            Please create the exact number of cards and quizzes indicated below:
            cards: 20
            quizzes: 2

            If this is a later batch, continue exploring the same notes with new examples, deeper explanations, and reinforcement. Some repetition is okay for retention, but do not copy the exact same card wording.

            Return ONLY valid JSON:
            {
                "batchNumber": ${batchNumber},
                "cards": [
                    { "front": "...", "back": "..." }
                ],
                "quizzes": [{
                    "question": "...",
                    "options": ["...", "...", "...", "..."],
                    "answer": Index of answer in options object
                }]
            }

            Notes:
            ${notes}
            `,
        });

        const text = response.text;

        if (!text) {
            return NextResponse.json(
            { error: "Gemma returned no text" },
            { status: 500 }
        );
}

        const cleaned = text.replace(/```json|```/g, "").trim();

        let parsed;

        try{
            parsed = JSON.parse(cleaned);
        }catch (e){
            console.error("JSON Parse Failed:", cleaned);
            return NextResponse.json({
                error: "AI Formatting Issue",
                raw: cleaned
            }, { status: 500 });
        }

        return NextResponse.json(parsed);

    } catch(err) {
        return NextResponse.json(
            { error: "Something went wrong" }, 
            { status: 500 }
        );
    }
}