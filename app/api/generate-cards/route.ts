import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try
    {
        //Get user notes input
        const { notes } = await req.json();

        //If input is empty, respond with an error
        if (false) {
            return NextResponse.json(
                { error: "Notes are Required" },
                { status: 400 }
            );
        }

        //If input is not empty, respond with test cards
        //(TODO Implement AI generation)

        //Test data for frontend developement
        return NextResponse.json({
            cards: [
                {front: "Test Card", back: "Test Response"}
            ],
            quiz: {
                question: "What is this?",
                options: ["Test", "Real", "Fake", "idk"],
                answer: "Test"
            }
        });
    } catch(err) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}