'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Button } from "./button";
import Dropzone from "react-dropzone";
import { FileIcon } from "@phosphor-icons/react/dist/ssr";

enum State {
    UPLOAD,
    RECENTS
};

interface UploadCardProps {
    onTextExtracted: (text: string) => void;
}

export default function UploadCard({ onTextExtracted }: UploadCardProps) {
    const [currentState, setCurrentState] = useState(State.UPLOAD);
    const [uploadedFiles, setUploadedFiles] = useState(Array<File>());
    const [rawText, setRawText] = useState("");

    const handleChangeState = (state: State) => {
        setCurrentState(state);
    };

    const handleFileUpload = async (acceptedFiles: Array<File>) => {
        setUploadedFiles([...uploadedFiles, ...acceptedFiles]);

        const extractedTexts = await Promise.all(
            acceptedFiles.map(async (file) => {
                const text = await extractTextFromFile(file);
                return `\n\n--- ${file.name} ---\n${text}`;
            })
        );

        const combinedText = extractedTexts.join("\n");
        setRawText((prev) => prev + combinedText);
        onTextExtracted(combinedText);

        console.log("Extracted raw text:", combinedText);

        //change state
        setCurrentState(State.RECENTS);
    };

    const extractTextFromFile = async (file: File): Promise<string> => {
        if (file.type === "text/plain" || file.name.endsWith(".txt")) {
            return await file.text();
        }

        return `Unsupported file type: ${file.name}`;
    };

    return (
        <React.Fragment>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-center">
                        {currentState == State.UPLOAD ?
                            <div className="border-1 rounded-full">
                                <Button
                                    onClick={() => handleChangeState(State.UPLOAD)}>
                                    New Upload
                                </Button>
                                <Button variant="ghost"
                                    onClick={() => { handleChangeState(State.RECENTS) }}>
                                    Recent
                                </Button>
                            </div>
                            :

                            <div className="border-1 rounded-full">
                                <Button
                                    variant="ghost"
                                    onClick={() => handleChangeState(State.UPLOAD)}>
                                    New Upload
                                </Button>
                                <Button
                                    onClick={() => { handleChangeState(State.RECENTS) }}>
                                    Recent
                                </Button>
                            </div>
                        }
                    </div>
                </CardHeader>
                <CardContent className="min-h-50">
                    {currentState == State.UPLOAD ?
                        <Dropzone onDrop={acceptedFiles => handleFileUpload(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section className="border-dashed border-2 p-5 rounded-lg h-50 cursor-pointer">
                                    <div {...getRootProps()}
                                        className="flex flex-col items-center justify-evenly h-full">
                                        <FileIcon className="text-5xl" />
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files <b className="underline">here</b>, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        :
                        <ul className="flex flex-col gap-5">
                            {uploadedFiles.length <= 0 ?
                                <>Upload files</>
                                : uploadedFiles.map((file) => (
                                    <li key={file.name} className="flex gap-2 items-center justify-between">
                                        <FileIcon className="text-xl" />
                                        <span className="w-50">{file.name}</span>
                                        <span>{Math.round(file.size / (1024))} KB</span>
                                    </li>
                                ))}
                        </ul>
                    }

                    {rawText && (
                        <pre className="mt-4 max-h-40 overflow-y-auto text-xs whitespace-pre-wrap">
                            {rawText}
                        </pre>)}
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
